package ma.preva.session;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.access.AccessRepository;
import ma.preva.common.PageResponse;
import ma.preva.exam.Exam;
import ma.preva.exam.ExamRepository;
import ma.preva.exam.ExamStatus;
import ma.preva.exam.choice.Choice;
import ma.preva.exam.choice.ChoiceRepository;
import ma.preva.exam.dto.ExamDto;
import ma.preva.exam.question.Question;
import ma.preva.exam.question.QuestionRepository;
import ma.preva.exam.question.QuestionType;
import ma.preva.session.dto.AnswerDto;
import ma.preva.session.dto.SessionDto;
import ma.preva.session.dto.StartSessionRequest;
import ma.preva.session.dto.SubmitAnswerRequest;
import ma.preva.student.Student;
import ma.preva.student.StudentRepository;
import ma.preva.user.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;
    private final AnswerRepository answerRepository;
    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;
    private final ChoiceRepository choiceRepository;
    private final StudentRepository studentRepository;
    private final AccessRepository accessRepository;

    @Transactional
    public SessionDto startSession(StartSessionRequest request, User user) {
        Exam exam = examRepository.findById(request.examId())
                .orElseThrow(() -> new EntityNotFoundException("Exam not found"));

        if (exam.getStatus() != ExamStatus.PUBLISHED) {
            throw new IllegalArgumentException("Exam is not available");
        }

        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Student profile not found"));

        Long semesterId = exam.getModule().getSemester().getId();
        List<?> access = accessRepository.findActiveAccess(student.getId(), semesterId, LocalDateTime.now());
        if (access.isEmpty()) {
            throw new org.springframework.security.access.AccessDeniedException("No active access for this semester");
        }

        Optional<ExamSession> existing = sessionRepository.findByUserIdAndExamIdAndStatus(
                user.getId(), exam.getId(), SessionStatus.IN_PROGRESS);
        if (existing.isPresent()) {
            throw new IllegalStateException("An in-progress session already exists for this exam");
        }

        ExamSession session = new ExamSession();
        session.setUser(user);
        session.setExam(exam);
        session.setStatus(SessionStatus.IN_PROGRESS);
        session.setStartedAt(LocalDateTime.now());
        sessionRepository.save(session);

        ExamDto examDto = ExamDto.from(exam, false, true);
        return SessionDto.from(session, examDto, List.of());
    }

    @Transactional
    public AnswerDto saveAnswer(Long sessionId, SubmitAnswerRequest request, User user) {
        ExamSession session = getSessionOrThrow(sessionId);
        verifyOwner(session, user);
        verifyInProgress(session);

        Question question = questionRepository.findById(request.questionId())
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));

        if (!question.getExam().getId().equals(session.getExam().getId())) {
            throw new IllegalArgumentException("Question does not belong to this exam");
        }

        UserAnswer answer = answerRepository.findBySessionIdAndQuestionId(sessionId, request.questionId())
                .orElse(new UserAnswer());

        answer.setSession(session);
        answer.setQuestion(question);
        answer.setTextAnswer(request.textAnswer());

        if (request.choiceId() != null) {
            Choice choice = choiceRepository.findById(request.choiceId())
                    .orElseThrow(() -> new EntityNotFoundException("Choice not found"));
            answer.setChoice(choice);
            if (question.getQuestionType() == QuestionType.QCM) {
                answer.setIsCorrect(choice.isCorrect());
                answer.setPointsEarned(choice.isCorrect() ? question.getPoints() : BigDecimal.ZERO);
            }
        } else if (question.getQuestionType() == QuestionType.OPEN) {
            answer.setIsCorrect(null);
            answer.setPointsEarned(null);
        }

        return AnswerDto.from(answerRepository.save(answer));
    }

    @Transactional
    public SessionDto submit(Long sessionId, User user) {
        ExamSession session = getSessionOrThrow(sessionId);
        verifyOwner(session, user);
        verifyInProgress(session);

        List<Question> questions = questionRepository.findByExamIdOrderByOrderIndexAsc(session.getExam().getId());
        List<UserAnswer> existingAnswers = answerRepository.findBySessionId(sessionId);

        for (Question q : questions) {
            boolean answered = existingAnswers.stream()
                    .anyMatch(a -> a.getQuestion().getId().equals(q.getId()));
            if (!answered) {
                UserAnswer skipped = new UserAnswer();
                skipped.setSession(session);
                skipped.setQuestion(q);
                skipped.setIsCorrect(false);
                skipped.setPointsEarned(BigDecimal.ZERO);
                answerRepository.save(skipped);
            }
        }

        List<UserAnswer> allAnswers = answerRepository.findBySessionId(sessionId);
        BigDecimal score = allAnswers.stream()
                .map(a -> a.getPointsEarned() != null ? a.getPointsEarned() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalPoints = session.getExam().getTotalPoints();
        BigDecimal percentage = totalPoints.compareTo(BigDecimal.ZERO) > 0
                ? score.divide(totalPoints, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100))
                : BigDecimal.ZERO;

        session.setScore(score);
        session.setPercentageScore(percentage.setScale(2, RoundingMode.HALF_UP));
        session.setIsPassed(percentage.compareTo(session.getExam().getPassingScore()) >= 0);
        session.setStatus(SessionStatus.COMPLETED);
        session.setEndedAt(LocalDateTime.now());
        sessionRepository.save(session);

        ExamDto examDto = ExamDto.from(session.getExam(), true, true);
        List<AnswerDto> answerDtos = allAnswers.stream().map(AnswerDto::from).toList();
        return SessionDto.from(session, examDto, answerDtos);
    }

    public SessionDto getSession(Long sessionId, User user) {
        ExamSession session = getSessionOrThrow(sessionId);
        verifyOwner(session, user);
        boolean showAnswers = session.getStatus() == SessionStatus.COMPLETED;
        ExamDto examDto = ExamDto.from(session.getExam(), showAnswers, true);
        List<AnswerDto> answers = answerRepository.findBySessionId(sessionId).stream()
                .map(AnswerDto::from).toList();
        return SessionDto.from(session, examDto, answers);
    }

    public PageResponse<SessionDto> getMySessions(User user, int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "startedAt"));
        return PageResponse.of(sessionRepository.findByUserId(user.getId(), pageable)
                .map(s -> SessionDto.from(s, null, null)));
    }

    @Scheduled(fixedDelay = 600000)
    @Transactional
    public void abandonExpiredSessions() {
        List<ExamSession> sessions = sessionRepository.findAbandonedSessions(
                LocalDateTime.now().minusHours(24));
        for (ExamSession session : sessions) {
            int maxMinutes = session.getExam().getDurationMinutes() * 2;
            if (session.getStartedAt().plusMinutes(maxMinutes).isBefore(LocalDateTime.now())) {
                session.setStatus(SessionStatus.ABANDONED);
                session.setEndedAt(LocalDateTime.now());
                sessionRepository.save(session);
            }
        }
    }

    private ExamSession getSessionOrThrow(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Session not found: " + id));
    }

    private void verifyOwner(ExamSession session, User user) {
        if (!session.getUser().getId().equals(user.getId())) {
            throw new org.springframework.security.access.AccessDeniedException("Access denied");
        }
    }

    private void verifyInProgress(ExamSession session) {
        if (session.getStatus() != SessionStatus.IN_PROGRESS) {
            throw new IllegalStateException("Session is not in progress");
        }
    }
}
