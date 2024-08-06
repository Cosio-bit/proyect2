package tingeso_mingeso.reparacion.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import tingeso_mingeso.reparacion.model.VehiculoEntity;

import java.util.List;
import java.util.Optional;

@FeignClient(value = "vehiculo",
        path = "/api/v1/vehiculos"
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
