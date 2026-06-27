package ma.preva.content.university;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;

@Getter
@Setter
@Entity
@Table(name = "universities")
public class University extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(nullable = false)
    private String country = "Morocco";

    @Column(nullable = false)
    private String city;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
}
