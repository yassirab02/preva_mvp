package ma.preva.content.semester;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.content.semester.dto.SemesterDto;
import ma.preva.content.semester.dto.SemesterRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/semesters")
@RequiredArgsConstructor
@Tag(name = "Semesters")
public class SemesterController {

    private final SemesterService semesterService;

    @Operation(summary = "List semesters (optionally by major)")
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<SemesterDto>>> findAll(
            @RequestParam(required = false) Long majorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageResponse<SemesterDto> result = majorId != null
                ? semesterService.findByMajor(majorId, page, size)
                : semesterService.findAll(page, size);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Get semester by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SemesterDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(semesterService.findById(id)));
    }

    @Operation(summary = "Create a semester")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SemesterDto>> create(@Valid @RequestBody SemesterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(semesterService.create(request)));
    }

    @Operation(summary = "Update a semester")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SemesterDto>> update(@PathVariable Long id, @Valid @RequestBody SemesterRequest request) {
        return ResponseEntity.ok(ApiResponse.success(semesterService.update(id, request)));
    }
}
