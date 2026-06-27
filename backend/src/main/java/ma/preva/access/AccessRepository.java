package ma.preva.access;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AccessRepository extends JpaRepository<AccessControl, Long> {
    List<AccessControl> findByStudentId(Long studentId);

    @Query("SELECT a FROM AccessControl a WHERE a.student.id = :studentId AND a.semester.id = :semesterId AND (a.expiresAt IS NULL OR a.expiresAt > :now)")
    List<AccessControl> findActiveAccess(Long studentId, Long semesterId, LocalDateTime now);
}
