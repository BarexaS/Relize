package demo.services.user;

import demo.app.CustomUser;
import demo.app.UserDTO;

public interface UserService {
    CustomUser getUserByLogin(String login);
    Short addUser(UserDTO userDTO);
    void addSocialUser(CustomUser customUser);
}