package ma.preva.student.dto;

import ma.preva.student.Student;

import java.time.LocalDateTime;

public record StudentDto(
        Long id,
        Long userId,
        String name,
        String email,
        Long universityId,
        String universityName,
        Long majorId,
        String majorName,
        String requestedUniversity,
        String requestedMajor,
        LocalDateTime createdAt
) {
    public static StudentDto from(Student s) {
        return new StudentDto(
                s.getId(),
                s.getUser().getId(),
                s.getUser().getName(),
                s.getUser().getEmail(),
                s.getUniversity() != null ? s.getUniversity().getId() : null,
                s.getUniversity() != null ? s.getUniversity().getName() : null,
                s.getMajor() != null ? s.getMajor().getId() : null,
                s.getMajor() != null ? s.getMajor().getName() : null,
                s.getRequestedUniversity(),
                s.getRequestedMajor(),
                s.getCreatedAt()
        );
    }
}
