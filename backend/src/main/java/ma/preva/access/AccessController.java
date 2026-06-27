package ma.preva.access;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.access.dto.AccessControlDto;
import ma.preva.access.dto.AccessRequest;
import ma.preva.common.ApiResponse;
import ma.preva.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/access")
@RequiredArgsConstructor
@Tag(name = "Access Control")
public class AccessController {

    private final AccessService accessService;

    @Operation(summary = "Grant access to a student for a semester")
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<ApiResponse<AccessControlDto>> grant(
            @Valid @RequestBody AccessRequest request,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(accessService.grantAccess(request, currentUser)));
    }

    @Operation(summary = "List access controls for a student")
    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'STUDENT')")
    public ResponseEntity<ApiResponse<List<AccessControlDto>>> findByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(ApiResponse.success(accessService.findByStudent(studentId)));
    }

    @Operation(summary = "Revoke access")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> revoke(@PathVariable Long id) {
        accessService.revoke(id);
        return ResponseEntity.ok(ApiResponse.success("Access revoked", null));
    }
}
