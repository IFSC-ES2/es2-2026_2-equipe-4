package ifsc.edu.artigos.accountcreation.securityconfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class Config {

    @Value("${app.api.users.base}${app.api.users.create-account}/**")
    private String publicAccountRoutes;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.ignoringRequestMatchers(publicAccountRoutes))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(publicAccountRoutes).permitAll()
                        .anyRequest().authenticated())
                .build();
    }
}