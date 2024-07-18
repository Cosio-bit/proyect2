package tingeso_mingeso.backendprecioservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BackendPrecioServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendPrecioServiceApplication.class, args);
	}

}
