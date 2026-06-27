package ma.preva.content.module;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.content.module.dto.ModuleDto;
import ma.preva.content.module.dto.ModuleRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
@Tag(name = "Modules")
public class ModuleController {

    private final ModuleService moduleService;

    @Operation(summary = "List modules (optionally by semester)")
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ModuleDto>>> findAll(
            @RequestParam(required = false) Long semesterId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageResponse<ModuleDto> result = semesterId != null
                ? moduleService.findBySemester(semesterId, page, size)
                : moduleService.findAll(page, size);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Get module by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ModuleDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(moduleService.findById(id)));
    }

    @Operation(summary = "Create a module")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ModuleDto>> create(@Valid @RequestBody ModuleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(moduleService.create(request)));
    }

    @Operation(summary = "Update a module")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ModuleDto>> update(@PathVariable Long id, @Valid @RequestBody ModuleRequest request) {
        return ResponseEntity.ok(ApiResponse.success(moduleService.update(id, request)));
    }
}
