package tingeso_mingeso.backendreparacionservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import tingeso_mingeso.backendreparacionservice.model.VehiculoEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@FeignClient(value = "backend-vehiculo-service",
        path = "/vehiculos"
        )
public interface VehiculoFeignClient {
        
    @GetMapping("/vehiculo/{id}")
    Optional<VehiculoEntity> mostrarVehiculo(@PathVariable Long id);
    
    @GetMapping("/tipoVehiculo/{tipoVehiculo}")
    List<VehiculoEntity> mostrarVehiculosPorTipoVehiculo(@PathVariable("tipoVehiculo") String tipoVehiculo);

    @GetMapping("/marca/{marca}")
    List<VehiculoEntity> mostrarVehiculosPorMarca(@PathVariable("marca") String marca);

    @GetMapping("/tipoMotor/{tipoMotor}")
    List<VehiculoEntity> mostrarVehiculosPorTipoMotor(@PathVariable("tipoMotor") String tipoMotor);

    
}
