package ma.preva.registration;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.student.Student;
import ma.preva.user.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "registration_requests")
public class RegistrationRequest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "requested_university", nullable = false)
    private String requestedUniversity;

    @Column(name = "requested_major", nullable = false)
    private String requestedMajor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RegistrationStatus status = RegistrationStatus.PENDING;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;

    @Column(name = "submitted_at", nullable = false)
    private LocalDateTime submittedAt = LocalDateTime.now();

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
}
