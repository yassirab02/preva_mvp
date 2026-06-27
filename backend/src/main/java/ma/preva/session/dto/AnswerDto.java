package ma.preva.session.dto;

import ma.preva.session.UserAnswer;

import java.math.BigDecimal;

public record AnswerDto(
        Long id,
        Long questionId,
        Long choiceId,
        String textAnswer,
        Boolean isCorrect,
        BigDecimal pointsEarned
) {
    public static AnswerDto from(UserAnswer a) {
        return new AnswerDto(
                a.getId(),
                a.getQuestion().getId(),
                a.getChoice() != null ? a.getChoice().getId() : null,
                a.getTextAnswer(),
                a.getIsCorrect(),
                a.getPointsEarned()
        );
    }
}
