package ma.preva.session.dto;

import ma.preva.exam.dto.ExamDto;
import ma.preva.session.ExamSession;
import ma.preva.session.SessionStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record SessionDto(
        Long id,
        Long examId,
        String examTitle,
        SessionStatus status,
        BigDecimal score,
        BigDecimal percentageScore,
        Boolean isPassed,
        LocalDateTime startedAt,
        LocalDateTime endedAt,
        ExamDto exam,
        List<AnswerDto> answers
) {
    public static SessionDto from(ExamSession s, ExamDto examDto, List<AnswerDto> answers) {
        return new SessionDto(
                s.getId(),
                s.getExam().getId(),
                s.getExam().getTitle(),
                s.getStatus(),
                s.getScore(),
                s.getPercentageScore(),
                s.getIsPassed(),
                s.getStartedAt(),
                s.getEndedAt(),
                examDto,
                answers
        );
    }
}
