package ma.preva.exam.choice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.exam.question.Question;

@Getter
@Setter
@Entity
@Table(name = "choices")
public class Choice extends BaseEntity {

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    @Column(name = "is_correct", nullable = false)
    private boolean isCorrect = false;

    @Column(name = "\"order\"", nullable = false)
    private int orderIndex = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
}
