package ma.preva.content.module.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ModuleRequest(
        @NotBlank String name,
        String description,
        int order,
        String coverImageUrl,
        @NotNull Long semesterId
) {}
