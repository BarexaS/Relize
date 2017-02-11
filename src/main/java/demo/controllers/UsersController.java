package demo.controllers;

import demo.app.CustomUser;
import demo.app.DTO.UserDTO;
import demo.services.token.GetTokenService;
import demo.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

@RestController
public class UsersController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProviderSignInUtils providerSignInUtils;

    @Autowired
    private GetTokenService getTokenService;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String singup(@RequestBody UserDTO userDTO) {
        String result = userService.addUser(userDTO);
        return result;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public void singup(WebRequest request, HttpServletResponse response) throws IOException {
        Connection<?> connection = providerSignInUtils.getConnectionFromSession(request);
        CustomUser user = userService.addSocialUser(connection);
        providerSignInUtils.doPostSignUp(user.getLogin(), request);
        response.sendRedirect("/index.html");
    }

    @RequestMapping(value = "/get-token", method = RequestMethod.POST)
    public String tokenRequest(@RequestParam("login") String login,@RequestParam("password") String pass){
        String result = "Error";
        try {
            result =  getTokenService.getToken(login, pass);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @RequestMapping(value = "/get-login", method = RequestMethod.GET)
    public String loginRequest(Principal principal){
        return principal.getName();
    }

}
