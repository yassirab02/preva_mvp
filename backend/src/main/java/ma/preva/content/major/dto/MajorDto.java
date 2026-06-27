package ma.preva.content.major.dto;

import ma.preva.content.major.Major;

import java.time.LocalDateTime;

public record MajorDto(
        Long id,
        String name,
        String slug,
        int durationYears,
        boolean isActive,
        Long universityId,
        String universityName,
        LocalDateTime createdAt
) {
    public static MajorDto from(Major m) {
        return new MajorDto(m.getId(), m.getName(), m.getSlug(), m.getDurationYears(),
                m.isActive(), m.getUniversity().getId(), m.getUniversity().getName(), m.getCreatedAt());
    }
}
