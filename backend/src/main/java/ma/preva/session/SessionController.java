package ma.preva.session;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.session.dto.AnswerDto;
import ma.preva.session.dto.SessionDto;
import ma.preva.session.dto.StartSessionRequest;
import ma.preva.session.dto.SubmitAnswerRequest;
import ma.preva.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
@Tag(name = "Exam Sessions")
public class SessionController {

    private final SessionService sessionService;

    @Operation(summary = "Start an exam session")
    @PostMapping("/start")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<SessionDto>> start(
            @Valid @RequestBody StartSessionRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(sessionService.startSession(request, user)));
    }

    @Operation(summary = "Save an answer")
    @PostMapping("/{id}/answer")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<AnswerDto>> answer(
            @PathVariable Long id,
            @Valid @RequestBody SubmitAnswerRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(sessionService.saveAnswer(id, request, user)));
    }

    @Operation(summary = "Submit an exam session")
    @PostMapping("/{id}/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<SessionDto>> submit(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(sessionService.submit(id, user)));
    }

    @Operation(summary = "Get a session by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<SessionDto>> getSession(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(sessionService.getSession(id, user)));
    }

    @Operation(summary = "Get my session history")
    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<PageResponse<SessionDto>>> mySessions(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(sessionService.getMySessions(user, page, size)));
    }
}
