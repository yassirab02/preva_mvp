package ma.preva.content.semester.dto;

import ma.preva.content.semester.Semester;

import java.time.LocalDateTime;

public record SemesterDto(
        Long id,
        int number,
        String label,
        String academicYear,
        boolean isActive,
        Long majorId,
        String majorName,
        LocalDateTime createdAt
) {
    public static SemesterDto from(Semester s) {
        return new SemesterDto(s.getId(), s.getNumber(), s.getLabel(), s.getAcademicYear(),
                s.isActive(), s.getMajor().getId(), s.getMajor().getName(), s.getCreatedAt());
    }
}
