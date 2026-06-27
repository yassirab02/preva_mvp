package ma.preva.session.dto;

import jakarta.validation.constraints.NotNull;

public record StartSessionRequest(@NotNull Long examId) {}
