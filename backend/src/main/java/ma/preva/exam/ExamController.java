package ma.preva.exam;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.common.PageResponse;
import ma.preva.exam.choice.dto.ChoiceRequest;
import ma.preva.exam.dto.ExamDto;
import ma.preva.exam.dto.ExamRequest;
import ma.preva.exam.question.dto.QuestionRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
@Tag(name = "Exams")
public class ExamController {

    private final ExamService examService;

    @Operation(summary = "List exams by module")
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<PageResponse<ExamDto>>> findAll(
            @RequestParam Long moduleId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication auth) {
        return ResponseEntity.ok(ApiResponse.success(examService.findByModule(moduleId, auth, page, size)));
    }

    @Operation(summary = "Get exam by ID with questions")
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ExamDto>> findById(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(ApiResponse.success(examService.findById(id, auth)));
    }

    @Operation(summary = "Create an exam")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ExamDto>> create(@Valid @RequestBody ExamRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(examService.create(request)));
    }

    @Operation(summary = "Update an exam")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ExamDto>> update(@PathVariable Long id, @Valid @RequestBody ExamRequest request) {
        return ResponseEntity.ok(ApiResponse.success(examService.update(id, request)));
    }

    @Operation(summary = "Publish an exam")
    @PatchMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ExamDto>> publish(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(examService.publish(id)));
    }

    @Operation(summary = "Archive an exam")
    @PatchMapping("/{id}/archive")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ExamDto>> archive(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(examService.archive(id)));
    }

    @Operation(summary = "Add a question to an exam")
    @PostMapping("/{examId}/questions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> addQuestion(
            @PathVariable Long examId,
            @Valid @RequestBody QuestionRequest request) {
        examService.addQuestion(examId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Question added", null));
    }
}

