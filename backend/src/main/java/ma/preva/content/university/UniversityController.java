package ma.preva.content.university;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.content.university.dto.UniversityDto;
import ma.preva.content.university.dto.UniversityRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/universities")
@RequiredArgsConstructor
@Tag(name = "Universities")
public class UniversityController {

    private final UniversityService universityService;

    @Operation(summary = "List all universities")
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<UniversityDto>>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String direction) {
        return ResponseEntity.ok(ApiResponse.success(universityService.findAll(page, size, sort, direction)));
    }

    @Operation(summary = "Get university by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UniversityDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(universityService.findById(id)));
    }

    @Operation(summary = "Create a university")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UniversityDto>> create(@Valid @RequestBody UniversityRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(universityService.create(request)));
    }

    @Operation(summary = "Update a university")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UniversityDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody UniversityRequest request) {
        return ResponseEntity.ok(ApiResponse.success(universityService.update(id, request)));
    }

    @Operation(summary = "Soft-delete a university")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        universityService.softDelete(id);
        return ResponseEntity.ok(ApiResponse.success("University deactivated", null));
    }
}
