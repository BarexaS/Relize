package demo.configs.social;


import demo.services.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import org.springframework.social.oauth2.OAuth2Operations;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.social.security.AuthenticationNameUserIdSource;
import org.springframework.social.vkontakte.connect.VKontakteConnectionFactory;

import javax.annotation.PostConstruct;
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

    @Autowired
    private ProviderSignInController controller;

    @Override
    public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment environment) {
        FacebookConnectionFactory connectionFactory =
                new FacebookConnectionFactory(
                        "---",
                        "---");
        cfConfig.addConnectionFactory(connectionFactory);
        cfConfig.addConnectionFactory(new VKontakteConnectionFactory(
                "----",
                "----"
        ));

//        OAuth2Operations oauthOperations = connectionFactory.getOAuthOperations();
//        OAuth2Parameters params = new OAuth2Parameters();
//        params.setRedirectUri("https://jobs.dou.ua/top25/");
//        String authorizeUrl = oauthOperations.buildAuthorizeUrl(params);
//        System.out.println(authorizeUrl);
    }

    @PostConstruct
    public void providerSignInController() {
        controller.setApplicationUrl("organizeme.tk");
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
