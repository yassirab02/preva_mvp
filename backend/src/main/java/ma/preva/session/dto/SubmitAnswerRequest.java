package ma.preva.session.dto;

import jakarta.validation.constraints.NotNull;

public record SubmitAnswerRequest(
        @NotNull Long questionId,
        Long choiceId,
        String textAnswer
) {}
