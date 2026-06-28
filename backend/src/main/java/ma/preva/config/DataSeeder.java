package ma.preva.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.preva.user.AccountStatus;
import ma.preva.user.User;
import ma.preva.user.UserRepository;
import ma.preva.user.UserRole;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        seedAdmin("admin@preva.ma", "Super Admin", "Admin@1234");
    }

    private void seedAdmin(String email, String name, String password) {
        User admin = userRepository.findByEmail(email).orElseGet(() -> {
            User u = new User();
            u.setEmail(email);
            u.setName(name);
            u.setRole(UserRole.ADMIN);
            u.setAccountStatus(AccountStatus.ACTIVE);
            return u;
        });
        admin.setPasswordHash(passwordEncoder.encode(password));
        admin.setAccountStatus(AccountStatus.ACTIVE);
        userRepository.save(admin);
        log.info("Admin account ready: {}", email);
    }
}
