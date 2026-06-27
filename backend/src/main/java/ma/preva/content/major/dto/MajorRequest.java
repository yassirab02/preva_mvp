package ma.preva.content.major.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MajorRequest(
        @NotBlank String name,
        @NotBlank String slug,
        @Min(1) int durationYears,
        @NotNull Long universityId
) {}
