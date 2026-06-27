package ma.preva.access.dto;

import jakarta.validation.constraints.NotNull;
import ma.preva.access.AccessType;

import java.time.LocalDateTime;

public record AccessRequest(
        @NotNull Long studentId,
        @NotNull Long semesterId,
        @NotNull AccessType accessType,
        LocalDateTime expiresAt
) {}
