package ma.preva.student;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.student.dto.StudentDto;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public PageResponse<StudentDto> findAll(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return PageResponse.of(studentRepository.findAll(pageable).map(StudentDto::from));
    }

    public StudentDto findById(Long id) {
        return StudentDto.from(studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found: " + id)));
    }

    public StudentDto findByUserId(Long userId) {
        return StudentDto.from(studentRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found for user: " + userId)));
    }
}
