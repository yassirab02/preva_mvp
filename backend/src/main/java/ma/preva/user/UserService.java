package ma.preva.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.preva.common.PageResponse;
import ma.preva.user.dto.UserDto;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public PageResponse<UserDto> findAll(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return PageResponse.of(userRepository.findAll(pageable).map(UserDto::from));
    }

    public UserDto findById(Long id) {
        return UserDto.from(getOrThrow(id));
    }

    @Transactional
    public UserDto suspend(Long id) {
        User user = getOrThrow(id);
        user.setAccountStatus(AccountStatus.SUSPENDED);
        return UserDto.from(userRepository.save(user));
    }

    @Transactional
    public UserDto activate(Long id) {
        User user = getOrThrow(id);
        user.setAccountStatus(AccountStatus.ACTIVE);
        return UserDto.from(userRepository.save(user));
    }

    private User getOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + id));
    }
}
