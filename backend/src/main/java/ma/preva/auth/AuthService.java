package ma.preva.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.preva.auth.dto.AuthResponse;
import ma.preva.auth.dto.LoginRequest;
import ma.preva.auth.dto.RegisterRequest;
import ma.preva.registration.RegistrationRequest;
import ma.preva.registration.RegistrationRepository;
import ma.preva.student.Student;
import ma.preva.student.StudentRepository;
import ma.preva.user.AccountStatus;
import ma.preva.user.User;
import ma.preva.user.UserRepository;
import ma.preva.user.UserRole;
import ma.preva.user.dto.UserDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final RegistrationRepository registrationRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public UserDto register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(UserRole.STUDENT);
        user.setAccountStatus(AccountStatus.PENDING);
        userRepository.save(user);

        Student student = new Student();
        student.setUser(user);
        student.setRequestedUniversity(request.requestedUniversity());
        student.setRequestedMajor(request.requestedMajor());
        studentRepository.save(student);

        RegistrationRequest regRequest = new RegistrationRequest();
        regRequest.setStudent(student);
        regRequest.setRequestedUniversity(request.requestedUniversity());
        regRequest.setRequestedMajor(request.requestedMajor());
        registrationRepository.save(regRequest);

        return UserDto.from(user);
    }

    public AuthResponse login(LoginRequest request, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String accessToken = jwtService.generateAccessToken(user, Map.of("role", user.getRole().name()));
        String refreshToken = jwtService.generateRefreshToken(user);

        setRefreshCookie(response, refreshToken);

        return new AuthResponse(accessToken, UserDto.from(user));
    }

    public AuthResponse refresh(String refreshToken, HttpServletResponse response) {
        if (refreshToken == null) {
            throw new IllegalArgumentException("Refresh token not found");
        }
        String email = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new IllegalArgumentException("Invalid refresh token");
        }

        String newAccessToken = jwtService.generateAccessToken(user, Map.of("role", user.getRole().name()));
        String newRefreshToken = jwtService.generateRefreshToken(user);
        setRefreshCookie(response, newRefreshToken);

        return new AuthResponse(newAccessToken, UserDto.from(user));
    }

    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh_token", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    private void setRefreshCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (jwtService.getRefreshExpiryMs() / 1000));
        response.addCookie(cookie);
    }
}
