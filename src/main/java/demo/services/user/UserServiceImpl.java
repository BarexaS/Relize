package demo.services.user;

import demo.app.CustomUser;
import demo.app.Todo;
import demo.app.UserDTO;
import demo.app.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public CustomUser getUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    @Transactional
    public Short addUser(UserDTO userDTO) {
        return validateUser(userDTO);
    }

    @Override
    @Transactional
    public void addSocialUser(CustomUser customUser) {
        addNewUserData(customUser);
        userRepository.save(customUser);
    }

    private Short validateUser(UserDTO userDTO) {
        if (userDTO.getPassword().length() < 7) {
            //Password too short
            return 2;
        } else {
            if (!userDTO.getPassword().equals(userDTO.getRepPassword())) {
                //Password didn't match
                return 3;
            } else {
                try {
                    if (userDTO.getLogin().equalsIgnoreCase(userRepository.findByLogin(userDTO.getLogin()).getLogin())) {
                        //Login exist
                        return 1;
                    } else {
                        throw new NullPointerException();
                    }
                } catch (NullPointerException e){
                    //SUCCESS!
                    ShaPasswordEncoder encoder = new ShaPasswordEncoder();
                    String pass = encoder.encodePassword(userDTO.getPassword(), null);
                    CustomUser customUser = new CustomUser(userDTO.getLogin(), pass, userDTO.getSecretWord(), UserRole.USER);
                    addNewUserData(customUser);
                    userRepository.save(customUser);
                    return 0;
                }
            }
        }
    }

    private void addNewUserData(CustomUser newUser) {
        newUser.addTodo(new Todo("Welcome!", "This is your first node", false, newUser));
    }

}