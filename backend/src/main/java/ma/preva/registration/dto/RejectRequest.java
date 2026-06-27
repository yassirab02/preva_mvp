package ma.preva.registration.dto;

import jakarta.validation.constraints.NotBlank;

public record RejectRequest(@NotBlank String rejectionReason) {}
