/**
 *  Qualquer requisição será aceita de qualquer origem, com qualquer método e cabeçalho.
 *  Embaixo segue a versão comentada, que permite apenas requisições do front-end rodando na porta 5173.
 *  Para desenvolvimento no codespaces, tive que permitir qualquer origem, pois o codespaces roda em uma porta aleatória.
 */

package ifsc.edu.artigos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}


// package ifsc.edu.artigos.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {

//     @Override
//     public void addCorsMappings(CorsRegistry registry){
//         registry.addMapping("/**")
//                 .allowedOrigins("http://localhost:5173") // Origem do front, Vite roda na 5173
//                 .allowedMethods("GET", "POST", "PUT", "DELETE");
//     }
// }