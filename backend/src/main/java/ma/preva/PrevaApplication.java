package ma.preva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PrevaApplication {
    public static void main(String[] args) {
        SpringApplication.run(PrevaApplication.class, args);
    }
}
