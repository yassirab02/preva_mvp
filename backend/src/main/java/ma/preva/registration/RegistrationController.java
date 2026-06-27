package ma.preva.registration;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.registration.dto.RegistrationDto;
import ma.preva.registration.dto.RejectRequest;
import ma.preva.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
@Tag(name = "Registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    @Operation(summary = "List registration requests")
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<ApiResponse<PageResponse<RegistrationDto>>> findAll(
            @AuthenticationPrincipal User currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(registrationService.findAll(currentUser, page, size)));
    }

    @Operation(summary = "Get registration by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<ApiResponse<RegistrationDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(registrationService.findById(id)));
    }

    @Operation(summary = "Approve a registration request")
    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<ApiResponse<RegistrationDto>> approve(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.success(registrationService.approve(id, currentUser)));
    }

    @Operation(summary = "Reject a registration request")
    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<ApiResponse<RegistrationDto>> reject(
            @PathVariable Long id,
            @Valid @RequestBody RejectRequest rejectRequest,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.success(registrationService.reject(id, rejectRequest, currentUser)));
    }
}
