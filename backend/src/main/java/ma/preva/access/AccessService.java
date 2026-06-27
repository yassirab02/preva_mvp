package ma.preva.access;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.access.dto.AccessControlDto;
import ma.preva.access.dto.AccessRequest;
import ma.preva.content.semester.Semester;
import ma.preva.content.semester.SemesterRepository;
import ma.preva.student.Student;
import ma.preva.student.StudentRepository;
import ma.preva.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessService {

    private final AccessRepository accessRepository;
    private final StudentRepository studentRepository;
    private final SemesterRepository semesterRepository;

    @Transactional
    public AccessControlDto grantAccess(AccessRequest request, User grantedBy) {
        Student student = studentRepository.findById(request.studentId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        Semester semester = semesterRepository.findById(request.semesterId())
                .orElseThrow(() -> new EntityNotFoundException("Semester not found"));

        AccessControl ac = new AccessControl();
        ac.setStudent(student);
        ac.setSemester(semester);
        ac.setAccessType(request.accessType());
        ac.setGrantedBy(grantedBy);
        ac.setExpiresAt(request.expiresAt());
        return AccessControlDto.from(accessRepository.save(ac));
    }

    public List<AccessControlDto> findByStudent(Long studentId) {
        return accessRepository.findByStudentId(studentId).stream()
                .map(AccessControlDto::from).toList();
    }

    @Transactional
    public void revoke(Long id) {
        if (!accessRepository.existsById(id)) {
            throw new EntityNotFoundException("Access control not found: " + id);
        }
        accessRepository.deleteById(id);
    }
}
