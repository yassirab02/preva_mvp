package ma.preva.content.module;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ma.preva.common.BaseEntity;
import ma.preva.content.semester.Semester;

@Getter
@Setter
@Entity
@Table(name = "modules")
public class Module extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "\"order\"", nullable = false)
    private int order = 0;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @Column(name = "cover_image_url")
    private String coverImageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;
}
