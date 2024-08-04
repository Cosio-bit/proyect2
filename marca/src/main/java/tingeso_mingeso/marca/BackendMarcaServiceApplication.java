package tingeso_mingeso.marca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BackendMarcaServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendMarcaServiceApplication.class, args);
	}

}