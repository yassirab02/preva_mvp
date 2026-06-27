package ma.preva.content.semester;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.content.major.Major;
import ma.preva.content.major.MajorRepository;
import ma.preva.content.semester.dto.SemesterDto;
import ma.preva.content.semester.dto.SemesterRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SemesterService {

    private final SemesterRepository semesterRepository;
    private final MajorRepository majorRepository;

    public PageResponse<SemesterDto> findByMajor(Long majorId, int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "number"));
        return PageResponse.of(semesterRepository.findByMajorId(majorId, pageable).map(SemesterDto::from));
    }

    public PageResponse<SemesterDto> findAll(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "number"));
        return PageResponse.of(semesterRepository.findAll(pageable).map(SemesterDto::from));
    }

    public SemesterDto findById(Long id) {
        return SemesterDto.from(getOrThrow(id));
    }

    @Transactional
    public SemesterDto create(SemesterRequest request) {
        Major major = majorRepository.findById(request.majorId())
                .orElseThrow(() -> new EntityNotFoundException("Major not found"));
        Semester s = new Semester();
        s.setNumber(request.number());
        s.setLabel(request.label());
        s.setAcademicYear(request.academicYear());
        s.setMajor(major);
        return SemesterDto.from(semesterRepository.save(s));
    }

    @Transactional
    public SemesterDto update(Long id, SemesterRequest request) {
        Semester s = getOrThrow(id);
        Major major = majorRepository.findById(request.majorId())
                .orElseThrow(() -> new EntityNotFoundException("Major not found"));
        s.setNumber(request.number());
        s.setLabel(request.label());
        s.setAcademicYear(request.academicYear());
        s.setMajor(major);
        return SemesterDto.from(semesterRepository.save(s));
    }

    private Semester getOrThrow(Long id) {
        return semesterRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Semester not found: " + id));
    }
}
