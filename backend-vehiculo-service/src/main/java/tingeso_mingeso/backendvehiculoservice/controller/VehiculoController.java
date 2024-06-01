package tingeso_mingeso.backendvehiculoservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tingeso_mingeso.backendvehiculoservice.entity.VehiculoEntity;
import tingeso_mingeso.backendvehiculoservice.service.VehiculoService;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api/v1/vehiculos")
@CrossOrigin("*")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping("/vehiculo/{id}")
    public ResponseEntity<Optional<VehiculoEntity>> mostrarVehiculo(@PathVariable Long id) {
        Optional<VehiculoEntity> vehiculo = Optional.ofNullable(vehiculoService.obtenerPorId(id));
            VehiculoEntity vehiculoEntity = vehiculo.get();
            return ResponseEntity.ok(Optional.of(vehiculoEntity));
        }

    @GetMapping("/vehiculo")
    public ResponseEntity<VehiculoEntity> VehiculoFormvehiculo() {
        return ResponseEntity.ok(new VehiculoEntity());
    }

	@PostMapping("/vehiculo")
	public ResponseEntity<VehiculoEntity> nuevoVehiculo(@RequestBody VehiculoEntity vehiculo) {
		return ResponseEntity.ok(vehiculoService.guardarVehiculo(vehiculo));
	}

	@GetMapping("/")
	public ResponseEntity<List<VehiculoEntity>> listar() {
		return ResponseEntity.ok(vehiculoService.obtenerVehiculos());
	}

    @DeleteMapping("/vehiculo/{id}")
    public ResponseEntity<Boolean> deleteVehiculoById(@PathVariable Long id) throws Exception {
        var isDeleted = vehiculoService.deleteVehiculo(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/vehiculo")
    public ResponseEntity<VehiculoEntity> updateVehiculo(@RequestBody VehiculoEntity vehiculo){
        VehiculoEntity vehiculo1 = vehiculoService.updateVehiculo(vehiculo);
        return ResponseEntity.ok(vehiculo1);
    }

    @GetMapping("/tipoVehiculo/{tipoVehiculo}")
    public ResponseEntity<List<VehiculoEntity>> mostrarVehiculosPorTipoVehiculo(@PathVariable("tipoVehiculo") String tipoVehiculo) {
        return ResponseEntity.ok(vehiculoService.obtenerVehiculosPorTipoVehiculo(tipoVehiculo));
    }

    @GetMapping("/marca/{marca}")
    public ResponseEntity<List<VehiculoEntity>> mostrarVehiculosPorMarca(@PathVariable("marca") String marca) {
        return ResponseEntity.ok(vehiculoService.obtenerVehiculosPorMarca(marca));
    }

    @GetMapping("/tipoMotor/{tipoMotor}")
    public ResponseEntity<List<VehiculoEntity>> mostrarVehiculosPorTipoMotor(@PathVariable("tipoMotor") String tipoMotor) {
        return ResponseEntity.ok(vehiculoService.obtenerVehiculosPorTipoMotor(tipoMotor));
    }


}

