package tingeso_mingeso.backendvehiculosservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BackendVehiculosServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendVehiculosServiceApplication.class, args);
	}

}
