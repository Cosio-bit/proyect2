package tingeso_mingeso.marca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MarcaServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarcaServiceApplication.class, args);
	}

}