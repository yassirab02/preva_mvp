package ma.preva.content.university;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.content.university.dto.UniversityDto;
import ma.preva.content.university.dto.UniversityRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UniversityService {

    private final UniversityRepository universityRepository;

    public PageResponse<UniversityDto> findAll(int page, int size, String sort, String direction) {
        Sort.Direction dir = Sort.Direction.fromString(direction);
        var pageable = PageRequest.of(page, size, Sort.by(dir, sort));
        return PageResponse.of(universityRepository.findAll(pageable).map(UniversityDto::from));
    }

    public UniversityDto findById(Long id) {
        return UniversityDto.from(getOrThrow(id));
    }

    @Transactional
    public UniversityDto create(UniversityRequest request) {
        if (universityRepository.existsBySlug(request.slug())) {
            throw new IllegalArgumentException("Slug already exists");
        }
        University u = new University();
        u.setName(request.name());
        u.setSlug(request.slug());
        u.setLogoUrl(request.logoUrl());
        u.setCountry(request.country());
        u.setCity(request.city());
        return UniversityDto.from(universityRepository.save(u));
    }

    @Transactional
    public UniversityDto update(Long id, UniversityRequest request) {
        University u = getOrThrow(id);
        u.setName(request.name());
        u.setSlug(request.slug());
        u.setLogoUrl(request.logoUrl());
        u.setCountry(request.country());
        u.setCity(request.city());
        return UniversityDto.from(universityRepository.save(u));
    }

    @Transactional
    public void softDelete(Long id) {
        University u = getOrThrow(id);
        u.setActive(false);
        universityRepository.save(u);
    }

    private University getOrThrow(Long id) {
        return universityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("University not found: " + id));
    }
}
