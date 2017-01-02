package demo.controllers;

import demo.app.CustomUser;
import demo.app.UserDTO;
import demo.app.UserRole;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class UsersController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProviderSignInUtils providerSignInUtils;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public Short singup(@RequestBody UserDTO userDTO) {
        Short result = userService.addUser(userDTO);
        return result;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public void singup(WebRequest request, HttpServletResponse response) throws IOException {
        Connection<?> connection = providerSignInUtils.getConnectionFromSession(request);
        CustomUser user = new CustomUser(connection.getDisplayName(),connection.createData().getProviderUserId(),"null", UserRole.USER);
        userService.addSocialUser(user);
        providerSignInUtils.doPostSignUp(user.getLogin(), request);
        System.out.println("YOLO!!!");
        response.sendRedirect("/index.html");
    }

}
