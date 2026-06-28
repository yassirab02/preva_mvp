package ma.preva.content.module;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.content.module.dto.ModuleDto;
import ma.preva.content.module.dto.ModuleRequest;
import ma.preva.content.semester.Semester;
import ma.preva.content.semester.SemesterRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final SemesterRepository semesterRepository;

    public PageResponse<ModuleDto> findBySemester(Long semesterId, int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "order"));
        return PageResponse.of(moduleRepository.findBySemesterId(semesterId, pageable).map(ModuleDto::from));
    }

    public PageResponse<ModuleDto> findAll(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "order"));
        return PageResponse.of(moduleRepository.findAll(pageable).map(ModuleDto::from));
    }

    public ModuleDto findById(Long id) {
        return ModuleDto.from(getOrThrow(id));
    }

    @Transactional
    public ModuleDto create(ModuleRequest request) {
        Semester semester = semesterRepository.findById(request.semesterId())
                .orElseThrow(() -> new EntityNotFoundException("Semester not found"));
        Module m = new Module();
        m.setName(request.name());
        m.setDescription(request.description());
        m.setOrderIndex(request.order());
        m.setCoverImageUrl(request.coverImageUrl());
        m.setSemester(semester);
        return ModuleDto.from(moduleRepository.save(m));
    }

    @Transactional
    public ModuleDto update(Long id, ModuleRequest request) {
        Module m = getOrThrow(id);
        Semester semester = semesterRepository.findById(request.semesterId())
                .orElseThrow(() -> new EntityNotFoundException("Semester not found"));
        m.setName(request.name());
        m.setDescription(request.description());
        m.setOrderIndex(request.order());
        m.setCoverImageUrl(request.coverImageUrl());
        m.setSemester(semester);
        return ModuleDto.from(moduleRepository.save(m));
    }

    private Module getOrThrow(Long id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Module not found: " + id));
    }
}
