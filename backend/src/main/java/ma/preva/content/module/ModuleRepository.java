package ma.preva.content.module;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    Page<Module> findBySemesterId(Long semesterId, Pageable pageable);
    Page<Module> findBySemesterIdAndIsActive(Long semesterId, boolean isActive, Pageable pageable);
}
