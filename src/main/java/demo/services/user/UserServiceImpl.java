package demo.services.user;

import demo.app.CustomUser;
import demo.app.DTO.UserDTO;
import demo.app.Todo;
import demo.app.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.social.connect.Connection;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomUser getUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public String addUser(UserDTO userDTO) {
        return validateUser(userDTO);
    }

    @Override
    public CustomUser addSocialUser(Connection<?> connection) {
        CustomUser user;
        String login = connection.getDisplayName();
        while (userRepository.findByLogin(login) != null) {
           login = login + (int)(Math.random()*10);
        }
        user = new CustomUser(login, connection.createData().getProviderUserId(), "null", UserRole.USER);
        addNewCustomUser(user);
        return user;
    }

    private String validateUser(UserDTO userDTO) {
        String result = "ERROR";
        if (userDTO.getPassword().length() < 7) {
            //Password too short
            result = "Password too short";
        } else {
            if (!userDTO.getPassword().equals(userDTO.getRepPassword())) {
                //Passwords didn't match
                result = "Passwords didn't match";
            } else {
                try {
                    if (userDTO.getLogin().equalsIgnoreCase(userRepository.findByLogin(userDTO.getLogin()).getLogin())) {
                        //Login exist
                        result = "Login already exist";
                    }
                } catch (NullPointerException e){
                    //SUCCESS!
                    ShaPasswordEncoder encoder = new ShaPasswordEncoder();
                    String pass = encoder.encodePassword(userDTO.getPassword(), null);
                    CustomUser customUser = new CustomUser(userDTO.getLogin(), pass, userDTO.getSecretWord(), UserRole.USER);
                    addNewCustomUser(customUser);
                    result = "SUCCESS";
                }
            }
        }
        return result;
    }

    @Transactional
    private void addNewCustomUser(CustomUser newUser){
        addNewUserData(newUser);
        userRepository.save(newUser);
    }

    private void addNewUserData(CustomUser newUser) {
        newUser.addTodo(new Todo("Welcome!", "This is your first node", false, newUser));
    }

}