package ma.preva.officer;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.officer.dto.CreateOfficerRequest;
import ma.preva.officer.dto.OfficerDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/officers")
@RequiredArgsConstructor
@Tag(name = "Officers")
public class OfficerController {

    private final OfficerService officerService;

    @Operation(summary = "List all officers")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PageResponse<OfficerDto>>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(officerService.findAll(page, size)));
    }

    @Operation(summary = "Get officer by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<OfficerDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(officerService.findById(id)));
    }

    @Operation(summary = "Create an officer account")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<OfficerDto>> create(@Valid @RequestBody CreateOfficerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(officerService.create(request)));
    }

    @Operation(summary = "Update an officer")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<OfficerDto>> update(
            @PathVariable Long id,
            @Valid @RequestBody CreateOfficerRequest request) {
        return ResponseEntity.ok(ApiResponse.success(officerService.update(id, request)));
    }
}
