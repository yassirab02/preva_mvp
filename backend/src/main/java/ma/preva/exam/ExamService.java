package ma.preva.exam;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.content.module.Module;
import ma.preva.content.module.ModuleRepository;
import ma.preva.exam.choice.Choice;
import ma.preva.exam.choice.ChoiceRepository;
import ma.preva.exam.choice.dto.ChoiceRequest;
import ma.preva.exam.dto.ExamDto;
import ma.preva.exam.dto.ExamRequest;
import ma.preva.exam.question.Question;
import ma.preva.exam.question.QuestionRepository;
import ma.preva.exam.question.dto.QuestionRequest;
import ma.preva.user.UserRole;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final ModuleRepository moduleRepository;
    private final QuestionRepository questionRepository;
    private final ChoiceRepository choiceRepository;

    public PageResponse<ExamDto> findByModule(Long moduleId, Authentication auth, int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "year"));
        boolean isAdmin = isAdminOrOfficer(auth);
        if (isAdmin) {
            return PageResponse.of(examRepository.findByModuleId(moduleId, pageable)
                    .map(e -> ExamDto.from(e, true, false)));
        }
        return PageResponse.of(examRepository.findByModuleIdAndStatus(moduleId, ExamStatus.PUBLISHED, pageable)
                .map(e -> ExamDto.from(e, false, false)));
    }

    public ExamDto findById(Long id, Authentication auth) {
        Exam exam = getOrThrow(id);
        boolean showAnswers = isAdminOrOfficer(auth);
        if (!showAnswers && exam.getStatus() != ExamStatus.PUBLISHED) {
            throw new EntityNotFoundException("Exam not found");
        }
        return ExamDto.from(exam, showAnswers, true);
    }

    @Transactional
    public ExamDto create(ExamRequest request) {
        Module module = moduleRepository.findById(request.moduleId())
                .orElseThrow(() -> new EntityNotFoundException("Module not found"));
        Exam exam = new Exam();
        exam.setTitle(request.title());
        exam.setYear(request.year());
        exam.setDurationMinutes(request.durationMinutes());
        exam.setTotalPoints(request.totalPoints());
        exam.setPassingScore(request.passingScore());
        exam.setModule(module);
        exam.setSourcePdfUrl(request.sourcePdfUrl());
        return ExamDto.from(examRepository.save(exam), true, false);
    }

    @Transactional
    public ExamDto update(Long id, ExamRequest request) {
        Exam exam = getOrThrow(id);
        Module module = moduleRepository.findById(request.moduleId())
                .orElseThrow(() -> new EntityNotFoundException("Module not found"));
        exam.setTitle(request.title());
        exam.setYear(request.year());
        exam.setDurationMinutes(request.durationMinutes());
        exam.setTotalPoints(request.totalPoints());
        exam.setPassingScore(request.passingScore());
        exam.setModule(module);
        exam.setSourcePdfUrl(request.sourcePdfUrl());
        return ExamDto.from(examRepository.save(exam), true, false);
    }

    @Transactional
    public ExamDto publish(Long id) {
        Exam exam = getOrThrow(id);
        exam.setStatus(ExamStatus.PUBLISHED);
        return ExamDto.from(examRepository.save(exam), true, false);
    }

    @Transactional
    public ExamDto archive(Long id) {
        Exam exam = getOrThrow(id);
        exam.setStatus(ExamStatus.ARCHIVED);
        return ExamDto.from(examRepository.save(exam), true, false);
    }

    @Transactional
    public void addQuestion(Long examId, QuestionRequest request) {
        Exam exam = getOrThrow(examId);
        Question q = new Question();
        q.setText(request.text());
        q.setPoints(request.points());
        q.setOrder(request.order());
        q.setCorrectAnswer(request.correctAnswer());
        q.setExplanation(request.explanation());
        q.setQuestionType(request.questionType());
        q.setExam(exam);
        questionRepository.save(q);
    }

    @Transactional
    public void updateQuestion(Long questionId, QuestionRequest request) {
        Question q = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));
        q.setText(request.text());
        q.setPoints(request.points());
        q.setOrder(request.order());
        q.setCorrectAnswer(request.correctAnswer());
        q.setExplanation(request.explanation());
        q.setQuestionType(request.questionType());
        questionRepository.save(q);
    }

    @Transactional
    public void deleteQuestion(Long questionId) {
        questionRepository.deleteById(questionId);
    }

    @Transactional
    public void addChoice(Long questionId, ChoiceRequest request) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));
        Choice c = new Choice();
        c.setText(request.text());
        c.setCorrect(request.isCorrect());
        c.setOrder(request.order());
        c.setQuestion(question);
        choiceRepository.save(c);
    }

    @Transactional
    public void updateChoice(Long choiceId, ChoiceRequest request) {
        Choice c = choiceRepository.findById(choiceId)
                .orElseThrow(() -> new EntityNotFoundException("Choice not found"));
        c.setText(request.text());
        c.setCorrect(request.isCorrect());
        c.setOrder(request.order());
        choiceRepository.save(c);
    }

    private Exam getOrThrow(Long id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found: " + id));
    }

    private boolean isAdminOrOfficer(Authentication auth) {
        return auth != null && auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_OFFICER"));
    }
}
