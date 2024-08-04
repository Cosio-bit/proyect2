package tingeso_mingeso.precio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PrecioServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrecioServiceApplication.class, args);
	}

}