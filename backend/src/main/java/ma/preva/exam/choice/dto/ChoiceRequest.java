package ma.preva.exam.choice.dto;

import jakarta.validation.constraints.NotBlank;

public record ChoiceRequest(
        @NotBlank String text,
        boolean isCorrect,
        int order
) {}
