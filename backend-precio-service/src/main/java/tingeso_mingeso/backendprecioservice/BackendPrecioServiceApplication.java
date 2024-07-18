package tingeso_mingeso.backendmarcaservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BackendMarcaServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendMarcaServiceApplication.class, args);
	}

}
