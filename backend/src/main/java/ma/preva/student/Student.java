package ma.preva.student;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.content.major.Major;
import ma.preva.content.university.University;
import ma.preva.user.User;

@Getter
@Setter
@Entity
@Table(name = "students")
public class Student extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id")
    private University university;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id")
    private Major major;

    @Column(name = "requested_university")
    private String requestedUniversity;

    @Column(name = "requested_major")
    private String requestedMajor;
}
