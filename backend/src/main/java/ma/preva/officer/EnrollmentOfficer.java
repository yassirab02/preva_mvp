package ma.preva.officer;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.content.university.University;
import ma.preva.user.User;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "enrollment_officers")
public class EnrollmentOfficer extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "staff_code", nullable = false, unique = true)
    private String staffCode;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "officer_universities",
            joinColumns = @JoinColumn(name = "officer_id"),
            inverseJoinColumns = @JoinColumn(name = "university_id")
    )
    private List<University> managedUniversities = new ArrayList<>();
}
