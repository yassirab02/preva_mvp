package ma.preva.session;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.exam.choice.Choice;
import ma.preva.exam.question.Question;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "user_answers", uniqueConstraints = @UniqueConstraint(columnNames = {"session_id", "question_id"}))
public class UserAnswer extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private ExamSession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "choice_id")
    private Choice choice;

    @Column(name = "text_answer", columnDefinition = "TEXT")
    private String textAnswer;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "points_earned", precision = 10, scale = 2)
    private BigDecimal pointsEarned;
}
