package tingeso_mingeso.reparacion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ReparacionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReparacionServiceApplication.class, args);
	}

}