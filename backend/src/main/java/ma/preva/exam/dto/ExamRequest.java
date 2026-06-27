package ma.preva.exam.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record ExamRequest(
        @NotBlank String title,
        @Min(2000) int year,
        @Min(1) int durationMinutes,
        @NotNull @Positive BigDecimal totalPoints,
        @NotNull @Positive BigDecimal passingScore,
        @NotNull Long moduleId,
        String sourcePdfUrl
) {}
