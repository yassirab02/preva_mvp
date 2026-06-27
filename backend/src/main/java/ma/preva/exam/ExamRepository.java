package ma.preva.exam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    Page<Exam> findByModuleId(Long moduleId, Pageable pageable);
    Page<Exam> findByModuleIdAndStatus(Long moduleId, ExamStatus status, Pageable pageable);
}
