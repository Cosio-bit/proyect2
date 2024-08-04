package tingeso_mingeso.reparacion.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import tingeso_mingeso.reparacion.model.MarcaEntity;

import java.util.ArrayList;
import java.util.Optional;

@FeignClient(value = "marca",
        path = "/api/v1/marcas"
        )
public interface MarcaFeignClient {

        @GetMapping("/marca/{id}")
        Optional<MarcaEntity> mostrarMarca(@PathVariable Long id);
    



}