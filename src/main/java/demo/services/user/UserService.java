package demo.services.user;

import demo.app.DTO.UserDTO;
import demo.app.entities.CustomUser;
import org.springframework.social.connect.Connection;

public interface UserService {
    CustomUser getUserByLogin(String login);
    String addUser(UserDTO userDTO);
    CustomUser addSocialUser(Connection<?> connection);
    void updateUser(CustomUser user);
}