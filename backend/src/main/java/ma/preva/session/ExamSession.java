package ma.preva.session;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.exam.Exam;
import ma.preva.user.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "exam_sessions")
public class ExamSession extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus status = SessionStatus.IN_PROGRESS;

    @Column(precision = 10, scale = 2)
    private BigDecimal score;

    @Column(name = "percentage_score", precision = 5, scale = 2)
    private BigDecimal percentageScore;

    @Column(name = "is_passed")
    private Boolean isPassed;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserAnswer> answers = new ArrayList<>();
}
