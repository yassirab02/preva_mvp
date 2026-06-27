package ma.preva.access.dto;

import ma.preva.access.AccessControl;
import ma.preva.access.AccessType;

import java.time.LocalDateTime;

public record AccessControlDto(
        Long id,
        Long studentId,
        String studentName,
        Long semesterId,
        String semesterLabel,
        AccessType accessType,
        String grantedByName,
        LocalDateTime grantedAt,
        LocalDateTime expiresAt
) {
    public static AccessControlDto from(AccessControl a) {
        return new AccessControlDto(
                a.getId(),
                a.getStudent().getId(),
                a.getStudent().getUser().getName(),
                a.getSemester().getId(),
                a.getSemester().getLabel(),
                a.getAccessType(),
                a.getGrantedBy().getName(),
                a.getGrantedAt(),
                a.getExpiresAt()
        );
    }
}
