package ma.preva.officer.dto;

import ma.preva.officer.EnrollmentOfficer;

import java.time.LocalDateTime;
import java.util.List;

public record OfficerDto(
        Long id,
        Long userId,
        String name,
        String email,
        String staffCode,
        List<Long> managedUniversityIds,
        LocalDateTime createdAt
) {
    public static OfficerDto from(EnrollmentOfficer o) {
        return new OfficerDto(
                o.getId(),
                o.getUser().getId(),
                o.getUser().getName(),
                o.getUser().getEmail(),
                o.getStaffCode(),
                o.getManagedUniversities().stream().map(u -> u.getId()).toList(),
                o.getCreatedAt()
        );
    }
}
