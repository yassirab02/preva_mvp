package ma.preva.content.major;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorRepository extends JpaRepository<Major, Long> {
    Page<Major> findByUniversityId(Long universityId, Pageable pageable);
    Page<Major> findByUniversityIdAndIsActive(Long universityId, boolean isActive, Pageable pageable);
}
