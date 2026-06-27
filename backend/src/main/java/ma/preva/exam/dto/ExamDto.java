package ma.preva.exam.dto;

import ma.preva.exam.Exam;
import ma.preva.exam.ExamStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ExamDto(
        Long id,
        String title,
        int year,
        int durationMinutes,
        BigDecimal totalPoints,
        BigDecimal passingScore,
        ExamStatus status,
        Long moduleId,
        String moduleTitle,
        String sourcePdfUrl,
        List<QuestionDto> questions,
        LocalDateTime createdAt
) {
    public static ExamDto from(Exam e, boolean showAnswers, boolean includeQuestions) {
        List<QuestionDto> questions = includeQuestions
                ? e.getQuestions().stream().map(q -> QuestionDto.from(q, showAnswers)).toList()
                : null;
        return new ExamDto(e.getId(), e.getTitle(), e.getYear(), e.getDurationMinutes(),
                e.getTotalPoints(), e.getPassingScore(), e.getStatus(),
                e.getModule().getId(), e.getModule().getName(),
                e.getSourcePdfUrl(), questions, e.getCreatedAt());
    }
}
