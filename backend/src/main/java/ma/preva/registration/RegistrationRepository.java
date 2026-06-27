package ma.preva.registration;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<RegistrationRequest, Long> {
    Page<RegistrationRequest> findAll(Pageable pageable);

    @Query("SELECT r FROM RegistrationRequest r WHERE r.student.university.id IN :universityIds")
    Page<RegistrationRequest> findByStudentUniversityIds(List<Long> universityIds, Pageable pageable);

    @Query("SELECT r FROM RegistrationRequest r WHERE r.student.user.id = :userId ORDER BY r.submittedAt DESC")
    List<RegistrationRequest> findByStudentUserId(Long userId);
}
