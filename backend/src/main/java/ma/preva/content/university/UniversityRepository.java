package ma.preva.content.university;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {
    Page<University> findByIsActive(boolean isActive, Pageable pageable);
    boolean existsBySlug(String slug);
}
