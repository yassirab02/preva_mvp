package ma.preva.user.dto;

import ma.preva.user.AccountStatus;
import ma.preva.user.User;
import ma.preva.user.UserRole;

import java.time.LocalDateTime;

public record UserDto(
        Long id,
        String name,
        String email,
        UserRole role,
        AccountStatus accountStatus,
        LocalDateTime createdAt
) {
    public static UserDto from(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getAccountStatus(),
                user.getCreatedAt()
        );
    }
}
