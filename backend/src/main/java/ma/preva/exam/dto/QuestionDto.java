package ma.preva.exam.dto;

import ma.preva.exam.question.Question;
import ma.preva.exam.question.QuestionType;

import java.math.BigDecimal;
import java.util.List;

public record QuestionDto(
        Long id,
        String text,
        BigDecimal points,
        int order,
        String correctAnswer,
        String explanation,
        QuestionType questionType,
        List<ChoiceDto> choices
) {
    public static QuestionDto from(Question q, boolean showAnswers) {
        List<ChoiceDto> choices = q.getChoices().stream()
                .map(c -> ChoiceDto.from(c, showAnswers))
                .toList();
        return new QuestionDto(
                q.getId(), q.getText(), q.getPoints(), q.getOrderIndex(),
                showAnswers ? q.getCorrectAnswer() : null,
                showAnswers ? q.getExplanation() : null,
                q.getQuestionType(), choices
        );
    }
}
