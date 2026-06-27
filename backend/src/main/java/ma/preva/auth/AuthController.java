package ma.preva.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.preva.auth.dto.AuthResponse;
import ma.preva.auth.dto.LoginRequest;
import ma.preva.auth.dto.RegisterRequest;
import ma.preva.common.ApiResponse;
import ma.preva.user.User;
import ma.preva.user.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Register a new student account")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto>> register(@Valid @RequestBody RegisterRequest request) {
        UserDto dto = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Registration submitted. Awaiting approval.", dto));
    }

    @Operation(summary = "Login and receive access token")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {
        AuthResponse auth = authService.login(request, response);
        return ResponseEntity.ok(ApiResponse.success(auth));
    }

    @Operation(summary = "Refresh access token using refresh cookie")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            HttpServletRequest request,
            HttpServletResponse response) {
        String refreshToken = extractRefreshToken(request);
        AuthResponse auth = authService.refresh(refreshToken, response);
        return ResponseEntity.ok(ApiResponse.success(auth));
    }

    @Operation(summary = "Logout and clear refresh cookie")
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok(ApiResponse.success("Logged out", null));
    }

    @Operation(summary = "Get current user profile")
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> me(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(UserDto.from(user)));
    }

    private String extractRefreshToken(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(c -> "refresh_token".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
