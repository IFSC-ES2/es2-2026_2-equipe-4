package ifsc.edu.artigos;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.data.mongodb.uri=mongodb://localhost:27017/testdb"
})
class ArtigosApplicationTests {

    @Autowired
    private ApplicationContext context;

    @Test
    @DisplayName("Deve carregar o contexto da aplicação Spring Boot com sucesso")
    void contextLoads() {
        // Valida que o contexto do Spring subiu e gerou os beans necessários
        assertNotNull(context, "O contexto da aplicação Spring Boot não deve ser nulo");
    }
}