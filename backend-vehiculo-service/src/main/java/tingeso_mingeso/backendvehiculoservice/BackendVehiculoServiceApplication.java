package tingeso_mingeso.backendvehiculoservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BackendVehiculoServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendVehiculoServiceApplication.class, args);
	}

}
