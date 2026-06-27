package ma.preva.content.module.dto;

import ma.preva.content.module.Module;

import java.time.LocalDateTime;

public record ModuleDto(
        Long id,
        String name,
        String description,
        int order,
        boolean isActive,
        String coverImageUrl,
        Long semesterId,
        String semesterLabel,
        LocalDateTime createdAt
) {
    public static ModuleDto from(Module m) {
        return new ModuleDto(m.getId(), m.getName(), m.getDescription(), m.getOrder(),
                m.isActive(), m.getCoverImageUrl(), m.getSemester().getId(),
                m.getSemester().getLabel(), m.getCreatedAt());
    }
}
