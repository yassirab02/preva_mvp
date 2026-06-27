package ma.preva.auth.dto;

import ma.preva.user.dto.UserDto;

public record AuthResponse(
        String accessToken,
        UserDto user
) {}
