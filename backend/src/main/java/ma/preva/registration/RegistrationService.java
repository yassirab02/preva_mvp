package ma.preva.registration;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.officer.EnrollmentOfficer;
import ma.preva.officer.OfficerRepository;
import ma.preva.registration.dto.RegistrationDto;
import ma.preva.registration.dto.RejectRequest;
import ma.preva.student.Student;
import ma.preva.student.StudentRepository;
import ma.preva.user.AccountStatus;
import ma.preva.user.User;
import ma.preva.user.UserRepository;
import ma.preva.user.UserRole;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final OfficerRepository officerRepository;

    public PageResponse<RegistrationDto> findAll(User currentUser, int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "submittedAt"));
        if (currentUser.getRole() == UserRole.OFFICER) {
            EnrollmentOfficer officer = officerRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Officer profile not found"));
            List<Long> universityIds = officer.getManagedUniversities().stream()
                    .map(u -> u.getId()).toList();
            return PageResponse.of(
                    registrationRepository.findByStudentUniversityIds(universityIds, pageable)
                            .map(RegistrationDto::from));
        }
        return PageResponse.of(registrationRepository.findAll(pageable).map(RegistrationDto::from));
    }

    public RegistrationDto findById(Long id) {
        return RegistrationDto.from(getOrThrow(id));
    }

    @Transactional
    public RegistrationDto approve(Long id, User reviewer) {
        RegistrationRequest req = getOrThrow(id);
        req.setStatus(RegistrationStatus.APPROVED);
        req.setReviewedBy(reviewer);
        req.setReviewedAt(LocalDateTime.now());

        Student student = req.getStudent();
        User user = student.getUser();
        user.setAccountStatus(AccountStatus.ACTIVE);
        userRepository.save(user);

        return RegistrationDto.from(registrationRepository.save(req));
    }

    @Transactional
    public RegistrationDto reject(Long id, RejectRequest rejectRequest, User reviewer) {
        RegistrationRequest req = getOrThrow(id);
        req.setStatus(RegistrationStatus.REJECTED);
        req.setRejectionReason(rejectRequest.rejectionReason());
        req.setReviewedBy(reviewer);
        req.setReviewedAt(LocalDateTime.now());
        return RegistrationDto.from(registrationRepository.save(req));
    }

    private RegistrationRequest getOrThrow(Long id) {
        return registrationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Registration request not found: " + id));
    }
}
