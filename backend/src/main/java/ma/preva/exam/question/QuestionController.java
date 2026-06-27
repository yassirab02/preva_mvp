package ma.preva.exam.question;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.common.ApiResponse;
import ma.preva.exam.ExamService;
import ma.preva.exam.choice.dto.ChoiceRequest;
import ma.preva.exam.question.dto.QuestionRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Questions")
public class QuestionController {

    private final ExamService examService;

    @Operation(summary = "Update a question")
    @PutMapping("/api/questions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id, @Valid @RequestBody QuestionRequest request) {
        examService.updateQuestion(id, request);
        return ResponseEntity.ok(ApiResponse.success("Question updated", null));
    }

    @Operation(summary = "Delete a question")
    @DeleteMapping("/api/questions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        examService.deleteQuestion(id);
        return ResponseEntity.ok(ApiResponse.success("Question deleted", null));
    }

    @Operation(summary = "Add choice to a question")
    @PostMapping("/api/questions/{questionId}/choices")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> addChoice(
            @PathVariable Long questionId,
            @Valid @RequestBody ChoiceRequest request) {
        examService.addChoice(questionId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Choice added", null));
    }

    @Operation(summary = "Update a choice")
    @PutMapping("/api/choices/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> updateChoice(
            @PathVariable Long id,
            @Valid @RequestBody ChoiceRequest request) {
        examService.updateChoice(id, request);
        return ResponseEntity.ok(ApiResponse.success("Choice updated", null));
    }
}
