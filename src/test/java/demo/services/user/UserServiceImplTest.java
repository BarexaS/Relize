package demo.services.user;

import demo.app.DTO.UserDTO;
import demo.app.entities.CustomUser;
import demo.app.enums.UserRole;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionData;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {

    @MockBean(name = "userRepository")
    private UserRepository userRepository;

    @Mock
    private Connection connection;

    @Autowired
    private UserService userService;

    private CustomUser testUser;

    @Before
    public void setUp(){
        this.testUser = new CustomUser("Foo", "1234567", "123", UserRole.USER);
        when(this.userRepository.findByLogin("Foo")).thenReturn(this.testUser);

        when(this.connection.getDisplayName()).thenReturn("Foo");
        when(this.connection.createData()).thenReturn(new ConnectionData("test","1234567","Foo","","","","","",new Long(1)));
    }

    @Test
    public void delegationTest() {
        CustomUser user = userService.getUserByLogin("Foo");
        assertThat(user).isEqualToComparingFieldByField(testUser);
    }

    @Test
    public void validationTest(){
        UserDTO userDTO = new UserDTO("Foo","pass","pass","123");
        String result = userService.addUser(userDTO);
        assertThat(result).isEqualToIgnoringCase("Password too short");
        userDTO.setPassword("password");
        result = userService.addUser(userDTO);
        assertThat(result).isEqualToIgnoringCase("Passwords didn't match");
        userDTO.setRepPassword("password");
        result = userService.addUser(userDTO);
        assertThat(result).isEqualToIgnoringCase("Login already exist");
        userDTO.setLogin("login");
        result = userService.addUser(userDTO);
        assertThat(result).isEqualToIgnoringCase("SUCCESS");
    }

    @Test
    public void newUserDataTest(){
        CustomUser user = userService.addSocialUser(connection);
        assertThat(user.getLogin()).isNotEqualToIgnoringCase("Foo");
        assertThat(user.getTodos().size()).isEqualTo(1);
    }

}
