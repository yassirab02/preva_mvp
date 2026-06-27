package ma.preva.session;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findBySessionId(Long sessionId);
    Optional<UserAnswer> findBySessionIdAndQuestionId(Long sessionId, Long questionId);
}
