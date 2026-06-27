package ma.preva.session;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<ExamSession, Long> {
    Optional<ExamSession> findByUserIdAndExamIdAndStatus(Long userId, Long examId, SessionStatus status);
    Page<ExamSession> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT s FROM ExamSession s WHERE s.status = 'IN_PROGRESS' AND s.startedAt < :cutoff")
    List<ExamSession> findAbandonedSessions(LocalDateTime cutoff);
}
