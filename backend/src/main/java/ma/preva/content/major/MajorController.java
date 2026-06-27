package ma.preva.content.major;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.content.major.dto.MajorDto;
import ma.preva.content.major.dto.MajorRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/majors")
@RequiredArgsConstructor
@Tag(name = "Majors")
public class MajorController {

    private final MajorService majorService;

    @Operation(summary = "List majors (optionally filtered by university)")
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<MajorDto>>> findAll(
            @RequestParam(required = false) Long universityId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageResponse<MajorDto> result = universityId != null
                ? majorService.findByUniversity(universityId, page, size)
                : majorService.findAll(page, size);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Get major by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MajorDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(majorService.findById(id)));
    }

    @Operation(summary = "Create a major")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MajorDto>> create(@Valid @RequestBody MajorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(majorService.create(request)));
    }

    @Operation(summary = "Update a major")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MajorDto>> update(@PathVariable Long id, @Valid @RequestBody MajorRequest request) {
        return ResponseEntity.ok(ApiResponse.success(majorService.update(id, request)));
    }
}
