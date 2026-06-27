package ma.preva.content.semester.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SemesterRequest(
        @Min(1) int number,
        @NotBlank String label,
        String academicYear,
        @NotNull Long majorId
) {}
