package tingeso_mingeso.backendvehiculoservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BackendVehiculoServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendVehiculoServiceApplication.class, args);
	}

}