package demo.configs.security.token;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenAuthenticationFilter extends GenericFilterBean {

    private final AuthenticationManager authenticationManager;

    private final AuthenticationEntryPoint authenticationEntryPoint;

    private final String HEADER = "token";

    public TokenAuthenticationFilter(AuthenticationManager authenticationManager, AuthenticationEntryPoint authenticationEntryPoint) {
        this.authenticationManager = authenticationManager;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        if (httpServletRequest.getRequestURI().length()!=1 && httpServletRequest.getRequestURI().substring(0,4).equalsIgnoreCase("/api")) {
            try {
                String headerValue = httpServletRequest.getHeader(HEADER);
                if (headerValue == null || headerValue.equalsIgnoreCase("")) {
                    throw new BadCredentialsException("Header " + HEADER + " is not found.", null);
                }

                Authentication authentication = authenticationManager.authenticate(new TokenAuthentication(headerValue));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                filterChain.doFilter(servletRequest, servletResponse);
            } catch (AuthenticationException ex) {
                authenticationEntryPoint.commence(httpServletRequest, httpServletResponse, ex);
            }
        } else {
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }
}