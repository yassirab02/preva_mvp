package ma.preva.content.university.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UniversityRequest(
        @NotBlank @Size(max = 255) String name,
        @NotBlank @Size(max = 255) String slug,
        String logoUrl,
        @NotBlank String country,
        @NotBlank String city
) {}
