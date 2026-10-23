package ifsc.edu.projetos.listagens;

import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@ConditionalOnProperty(name = "app.seed.projetos.enabled", havingValue = "true")
public class ListagensDataInitializer implements ApplicationRunner {

    private static final String[] TITULOS = {
            "Horta Inteligente", "Agenda Acadêmica", "Mapa Acessível", "Biblioteca Digital",
            "Controle de Despesas", "Portal de Eventos", "Monitor de Qualidade do Ar",
            "Plataforma de Mentoria", "Guia Gastronômico", "Gestor de Tarefas",
            "Catálogo de Jogos", "Doação Solidária", "Painel de Indicadores",
            "Aplicativo de Trilhas", "Organizador de Estudos", "Rede de Voluntariado",
            "Receitas Sustentáveis", "Gestão de Estoque", "Conecta Comunidade",
            "Monitor de Energia", "Vitrine Cultural", "Sistema de Reservas",
            "Mapa de Reciclagem", "Clube de Leitura", "Acompanhamento de Hábitos",
            "Feira de Ciências", "Assistente de Mobilidade", "Diário de Bordo",
            "Plataforma de Cursos", "Alerta de Chuvas"
    };

    private static final String[] TEMAS = {
            "Educação", "Sustentabilidade", "Acessibilidade", "Saúde", "Comunidade",
            "Gestão", "Cultura", "Mobilidade", "Tecnologia"
    };

    private static final List<List<String>> TECNOLOGIAS = List.of(
            List.of("Java", "Spring Boot", "MongoDB"),
            List.of("React", "JavaScript", "CSS"),
            List.of("Python", "FastAPI", "PostgreSQL"),
            List.of("Kotlin", "Android"),
            List.of("TypeScript", "Node.js", "Express"),
            List.of("Vue.js", "JavaScript", "Firebase")
    );

    private static final List<List<String>> AUTORES = List.of(
            List.of("Ana Silva", "Bruno Costa"),
            List.of("Carla Souza", "Diego Martins"),
            List.of("Elisa Oliveira", "Felipe Santos"),
            List.of("Giovana Lima", "Henrique Rocha"),
            List.of("Isabela Alves", "João Pereira")
    );

    private final ProjetoRepository projetoRepository;

    public ListagensDataInitializer(ProjetoRepository projetoRepository) {
        this.projetoRepository = projetoRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (projetoRepository.count() > 0) {
            return;
        }

        List<Projeto> projetos = new ArrayList<>(TITULOS.length);
        for (int index = 0; index < TITULOS.length; index++) {
            Projeto projeto = new Projeto();
            projeto.setTitulo(TITULOS[index]);
            projeto.setResumo("Projeto demonstrativo " + (index + 1)
                    + " para apresentar funcionalidades e tecnologias na vitrine.");
            projeto.setAutores(AUTORES.get(index % AUTORES.size()));
            projeto.setTecnologias(TECNOLOGIAS.get(index % TECNOLOGIAS.size()));
            projeto.setTema(TEMAS[index % TEMAS.length]);
            projeto.setImagens(List.of());
            projeto.setLinkRepositorio(String.format(
                    "https://github.com/ifsc-projetos/exemplo-%02d", index + 1));
            projeto.setLinkDemonstracao("");
            projetos.add(projeto);
        }

        projetoRepository.saveAll(projetos);
    }
}
