package ma.preva.content.major;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.content.major.dto.MajorDto;
import ma.preva.content.major.dto.MajorRequest;
import ma.preva.content.university.University;
import ma.preva.content.university.UniversityRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MajorService {

    private final MajorRepository majorRepository;
    private final UniversityRepository universityRepository;

    public PageResponse<MajorDto> findByUniversity(Long universityId, int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "name"));
        return PageResponse.of(majorRepository.findByUniversityId(universityId, pageable).map(MajorDto::from));
    }

    public PageResponse<MajorDto> findAll(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "name"));
        return PageResponse.of(majorRepository.findAll(pageable).map(MajorDto::from));
    }

    public MajorDto findById(Long id) {
        return MajorDto.from(getOrThrow(id));
    }

    @Transactional
    public MajorDto create(MajorRequest request) {
        University university = universityRepository.findById(request.universityId())
                .orElseThrow(() -> new EntityNotFoundException("University not found"));
        Major m = new Major();
        m.setName(request.name());
        m.setSlug(request.slug());
        m.setDurationYears(request.durationYears());
        m.setUniversity(university);
        return MajorDto.from(majorRepository.save(m));
    }

    @Transactional
    public MajorDto update(Long id, MajorRequest request) {
        Major m = getOrThrow(id);
        University university = universityRepository.findById(request.universityId())
                .orElseThrow(() -> new EntityNotFoundException("University not found"));
        m.setName(request.name());
        m.setSlug(request.slug());
        m.setDurationYears(request.durationYears());
        m.setUniversity(university);
        return MajorDto.from(majorRepository.save(m));
    }

    private Major getOrThrow(Long id) {
        return majorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Major not found: " + id));
    }
}
