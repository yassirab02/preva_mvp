package ma.preva.exam.question.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import ma.preva.exam.question.QuestionType;

import java.math.BigDecimal;

public record QuestionRequest(
        @NotBlank String text,
        @NotNull @Positive BigDecimal points,
        int order,
        String correctAnswer,
        String explanation,
        @NotNull QuestionType questionType
) {}
