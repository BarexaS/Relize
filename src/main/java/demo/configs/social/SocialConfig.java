package demo.configs.social;


import demo.services.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.social.UserIdSource;
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurerAdapter;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.jdbc.JdbcUsersConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.social.connect.web.ProviderSignInController;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.social.connect.web.SignInAdapter;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.security.AuthenticationNameUserIdSource;

import javax.sql.DataSource;

@Configuration
@EnableSocial
public class SocialConfig extends SocialConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private ConnectionFactoryLocator connectionFactoryLocator;

    @Autowired
    private UsersConnectionRepository usersConnectionRepository;

    @Override
    public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment environment) {
        FacebookConnectionFactory connectionFactory =
                new FacebookConnectionFactory(
                        "1843982582482040",
                        "12770211e4cf7dac1988440a9e1f03bc");
        cfConfig.addConnectionFactory(connectionFactory);
//        cfConfig.addConnectionFactory(new VKontakteConnectionFactory(
//                "----",
//                "----"
//        ));
    }

    @Bean
    public ConnectController connectController() {
        ConnectController controller = new ConnectController(
                connectionFactoryLocator, connectionRepository());
        controller.setApplicationUrl("http://localhost:8080");
        System.out.println("YOLO!!!!");
        return controller;
    }

    @Bean
    public ProviderSignInController providerSignInController(SignInAdapter signInAdapter) {
        ProviderSignInController controller = new ProviderSignInController(connectionFactoryLocator,
                usersConnectionRepository, signInAdapter);
        controller.setApplicationUrl("http://localhost:8080");
        System.out.println("YOLO-YOLO!!!!");
        return controller;
    }

    @Bean
    @Scope(value="request", proxyMode= ScopedProxyMode.INTERFACES)
    public ConnectionRepository connectionRepository(){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
        throw new IllegalStateException("Unable to get a ConnectionRepository: no user signed in");
    }
        return usersConnectionRepository.createConnectionRepository(authentication.getName());
}

    // Create the table in the database by executing the commands at
        // http://docs.spring.io/spring-social/docs/1.1.0.RELEASE/reference/htmlsingle/#section_jdbcConnectionFactory
        // and then execute
        // create unique index UserConnectionProviderUser on UserConnection(providerId, providerUserId);

    @Bean
    public UsersConnectionRepository usersConnectionRepository(UserRepository userRepository) {
        JdbcUsersConnectionRepository repository = new JdbcUsersConnectionRepository(
                dataSource, connectionFactoryLocator, Encryptors.noOpText());
        repository.setConnectionSignUp(new ConnectionSignUpImpl(userRepository));
        return repository;
    }


    @Bean
    public ProviderSignInUtils providerSignInUtils(ConnectionFactoryLocator connectionFactoryLocator, UsersConnectionRepository connectionRepository) {
        return new ProviderSignInUtils(connectionFactoryLocator, connectionRepository);
    }


    @Override
    public UserIdSource getUserIdSource() {
        return new AuthenticationNameUserIdSource();
    }
}
