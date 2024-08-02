package tingeso_mingeso.backendreparacionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BackendReparacionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendReparacionServiceApplication.class, args);
	}

}