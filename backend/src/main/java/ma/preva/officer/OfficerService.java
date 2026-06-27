package ma.preva.officer;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.content.university.University;
import ma.preva.content.university.UniversityRepository;
import ma.preva.officer.dto.CreateOfficerRequest;
import ma.preva.officer.dto.OfficerDto;
import ma.preva.user.AccountStatus;
import ma.preva.user.User;
import ma.preva.user.UserRepository;
import ma.preva.user.UserRole;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OfficerService {

    private final OfficerRepository officerRepository;
    private final UserRepository userRepository;
    private final UniversityRepository universityRepository;
    private final PasswordEncoder passwordEncoder;

    public PageResponse<OfficerDto> findAll(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return PageResponse.of(officerRepository.findAll(pageable).map(OfficerDto::from));
    }

    public OfficerDto findById(Long id) {
        return OfficerDto.from(getOrThrow(id));
    }

    @Transactional
    public OfficerDto create(CreateOfficerRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(UserRole.OFFICER);
        user.setAccountStatus(AccountStatus.ACTIVE);
        userRepository.save(user);

        List<University> universities = new ArrayList<>();
        if (request.universityIds() != null) {
            universities = universityRepository.findAllById(request.universityIds());
        }

        EnrollmentOfficer officer = new EnrollmentOfficer();
        officer.setUser(user);
        officer.setStaffCode(request.staffCode());
        officer.setManagedUniversities(universities);
        return OfficerDto.from(officerRepository.save(officer));
    }

    @Transactional
    public OfficerDto update(Long id, CreateOfficerRequest request) {
        EnrollmentOfficer officer = getOrThrow(id);
        List<University> universities = new ArrayList<>();
        if (request.universityIds() != null) {
            universities = universityRepository.findAllById(request.universityIds());
        }
        officer.setStaffCode(request.staffCode());
        officer.setManagedUniversities(universities);
        return OfficerDto.from(officerRepository.save(officer));
    }

    private EnrollmentOfficer getOrThrow(Long id) {
        return officerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Officer not found: " + id));
    }
}
