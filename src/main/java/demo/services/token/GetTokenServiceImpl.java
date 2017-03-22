package demo.services.token;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class GetTokenServiceImpl implements GetTokenService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public String getToken(String username, String password) throws Exception {
        if (username == null || password == null)
            return null;
        UserDetails user = userDetailsService.loadUserByUsername(username);
        Map<String, Object> tokenData = new HashMap<>();
        ShaPasswordEncoder encoder = new ShaPasswordEncoder();
        String pass = encoder.encodePassword(password, null);
        if (pass.equals(user.getPassword())) {
            tokenData.put("clientType", "user");
            tokenData.put("username", user.getUsername());

            JwtBuilder jwtBuilder = Jwts.builder();
            jwtBuilder.setClaims(tokenData);
            String key = "secret_key";
            String token = jwtBuilder.signWith(SignatureAlgorithm.HS512, key).compact();
            return token;
        } else {
            throw new Exception("Authentication error");
        }
    }

}
