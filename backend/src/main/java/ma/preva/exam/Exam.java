package ma.preva.exam;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.content.module.Module;
import ma.preva.exam.question.Question;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "exams")
public class Exam extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private int year;

    @Column(name = "duration_minutes", nullable = false)
    private int durationMinutes;

    @Column(name = "total_points", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPoints;

    @Column(name = "passing_score", nullable = false, precision = 10, scale = 2)
    private BigDecimal passingScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExamStatus status = ExamStatus.DRAFT;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;

    @Column(name = "source_pdf_url")
    private String sourcePdfUrl;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("\"order\" ASC")
    private List<Question> questions = new ArrayList<>();
}
