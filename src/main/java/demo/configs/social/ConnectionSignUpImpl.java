package demo.configs.social;

import demo.app.CustomUser;
import demo.app.UserRole;
import demo.services.user.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;


public class ConnectionSignUpImpl implements ConnectionSignUp {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public ConnectionSignUpImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public String execute(Connection<?> connection) {
        CustomUser user = new CustomUser();
        user.setLogin(connection.getDisplayName());
        user.setPassword(passwordEncoder.encode(connection.createData().getProviderUserId()));
        user.setRole(UserRole.USER);
        userRepository.save(user);
        return user.getLogin();
    }

}
