package demo.configs.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.social.security.SpringSocialConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new SimpleUrlAuthenticationFailureHandler();
    }

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .httpBasic()
                .and()
            .authorizeRequests()
                .antMatchers("/node_modules/**","/systemjs.config.js","/login/**").permitAll()
                .antMatchers("/signup").permitAll()
                .antMatchers("/signin**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/favicon.png").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login.html")
                .defaultSuccessUrl("/index.html",true)
                .loginProcessingUrl("/loginOn")
                .usernameParameter("username")
                .passwordParameter("password")
                .failureHandler(authenticationFailureHandler())
                .permitAll()
                .and()
            .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login.html")
                .invalidateHttpSession(true)
                .permitAll()
                .and()
            .apply(new SpringSocialConfigurer()
                    .postLoginUrl("http://159.203.77.168:80")
                    .alwaysUsePostLoginUrl(true));
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(new ShaPasswordEncoder());
    }
}
