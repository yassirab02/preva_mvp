package ma.preva.student;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.student.dto.StudentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@Tag(name = "Students")
public class StudentController {

    private final StudentService studentService;

    @Operation(summary = "List all students")
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<ApiResponse<PageResponse<StudentDto>>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(studentService.findAll(page, size)));
    }

    @Operation(summary = "Get student by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<ApiResponse<StudentDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(studentService.findById(id)));
    }
}
