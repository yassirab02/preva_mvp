package ma.preva.content.semester;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.content.major.Major;

@Getter
@Setter
@Entity
@Table(name = "semesters")
public class Semester extends BaseEntity {

    @Column(nullable = false)
    private int number;

    @Column(nullable = false)
    private String label;

    @Column(name = "academic_year")
    private String academicYear;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    private Major major;
}
