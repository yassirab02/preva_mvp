package ma.preva.registration.dto;

import ma.preva.registration.RegistrationRequest;
import ma.preva.registration.RegistrationStatus;

import java.time.LocalDateTime;

public record RegistrationDto(
        Long id,
        Long studentId,
        String studentName,
        String studentEmail,
        String requestedUniversity,
        String requestedMajor,
        RegistrationStatus status,
        String rejectionReason,
        String reviewedByName,
        LocalDateTime submittedAt,
        LocalDateTime reviewedAt
) {
    public static RegistrationDto from(RegistrationRequest r) {
        return new RegistrationDto(
                r.getId(),
                r.getStudent().getId(),
                r.getStudent().getUser().getName(),
                r.getStudent().getUser().getEmail(),
                r.getRequestedUniversity(),
                r.getRequestedMajor(),
                r.getStatus(),
                r.getRejectionReason(),
                r.getReviewedBy() != null ? r.getReviewedBy().getName() : null,
                r.getSubmittedAt(),
                r.getReviewedAt()
        );
    }
}
