package ma.preva.content.university.dto;

import ma.preva.content.university.University;

import java.time.LocalDateTime;

public record UniversityDto(
        Long id,
        String name,
        String slug,
        String logoUrl,
        String country,
        String city,
        boolean isActive,
        LocalDateTime createdAt
) {
    public static UniversityDto from(University u) {
        return new UniversityDto(u.getId(), u.getName(), u.getSlug(), u.getLogoUrl(),
                u.getCountry(), u.getCity(), u.isActive(), u.getCreatedAt());
    }
}
