package demo.services.user;

import demo.app.CustomUser;
import demo.app.DTO.UserDTO;
import org.springframework.social.connect.Connection;

public interface UserService {
    CustomUser getUserByLogin(String login);
    String addUser(UserDTO userDTO);
    CustomUser addSocialUser(Connection<?> connection);
}