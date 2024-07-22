package tingeso_mingeso.backendreparacionservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso_mingeso.backendreparacionservice.entity.ReparacionEntity;
import tingeso_mingeso.backendreparacionservice.service.ReparacionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/reparaciones")
@CrossOrigin("*")
public class ReparacionController {

    @Autowired
    private ReparacionService reparacionService;


    @GetMapping("/")
    public ResponseEntity<List<ReparacionEntity>>  listar() {
        return ResponseEntity.ok(reparacionService.obtenerReparaciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ReparacionEntity>> mostrarReparaciones(@PathVariable("id") String id) {
        return ResponseEntity.ok(reparacionService.obtenerReparacionesPorIdVehiculo(id));
    }

    //obtener todas las reparaciones de una marca de vehiculo
    @GetMapping("/marca/{marca}")
    public ResponseEntity<List<ReparacionEntity>> mostrarReparacionesPorMarca(@PathVariable("marca") String marca) {
        return ResponseEntity.ok(reparacionService.obtenerReparacionesPorMarca(marca));
    }

    //obtener todas las reparaciones de un tipo de vehiculo
    @GetMapping("/tipoVehiculo/{tipoVehiculo}")
    public ResponseEntity<List<ReparacionEntity>> mostrarReparacionesPorTipoVehiculo(@PathVariable("tipoVehiculo") String tipoVehiculo) {
        return ResponseEntity.ok(reparacionService.obtenerReparacionesPorTipoVehiculo(tipoVehiculo));
    }

    //obtener cantidad de reparaciones de un tipo de vehiculo y un tipo de reparacion
    @GetMapping("/tipoVehiculo/{tipoVehiculo}/{tipoReparacion}")
    public ResponseEntity<Integer> CantidadTipoVehiculoYReparacion(@PathVariable("tipoVehiculo") String tipoVehiculo, @RequestParam(value = "tipoReparacion") String tipoReparacion) {
        return ResponseEntity.ok(reparacionService.obtenerCantidadReparacionesPorTipoVehiculoYReparacion(tipoVehiculo, tipoReparacion));
    }

    //obtener monto total de reparaciones de un tipo de vehiculo y un tipo de reparacion
    @GetMapping("/tipoVehiculo/{tipoVehiculo}/{tipoReparacion}/monto")
    public ResponseEntity<Double> MontoTipoVehiculoYReparacion(@PathVariable("tipoVehiculo") String tipoVehiculo, @RequestParam(value = "tipoVehiculo") String tipoReparacion) {
        return ResponseEntity.ok(reparacionService.obtenerMontoReparacionesPorTipoVehiculoYReparacion(tipoVehiculo, tipoReparacion));
    }

    //obtener las reparaciones de un tipo de reparacion, de un mes especifico y sus dos anteriores
    @GetMapping("/tipoReparacion/{tipoReparacion}/{mes}")
    public ResponseEntity<List<Integer>> CantidadTipoReparacionYMes(@PathVariable("tipoReparacion") String tipoReparacion, @PathVariable("mes") int mes) {
        return ResponseEntity.ok(reparacionService.obtenerCantidadReparacionesPorTipoReparacionYMesYDosMesesAnteriores(tipoReparacion, mes));
    }

    //obtener las reparaciones de un tipo de reparacion, de un mes especifico y sus dos anteriores
    @GetMapping("/tipoReparacion/{tipoReparacion}/{mes}/porcentaje")
    public ResponseEntity<List<Double>> PorcentajeTipoReparacionYMes(@PathVariable("tipoReparacion") String tipoReparacion, @PathVariable("mes") int mes) {
        return ResponseEntity.ok(reparacionService.obtenerVariacionPorcentualReparacionesPorTipoReparacionYMesYDosMesesAnteriores(tipoReparacion, mes));
    }

    // desde el id de reparacion obtener la reparacion y el vehiculo
    @GetMapping("/reparacion/vehiculo/{id}")
    public ResponseEntity<List<Object>> ReparacionYVehiculo(@PathVariable Long id) {
        return ResponseEntity.ok(reparacionService.obtenerReparacionYVehiculo(id));

    }

    //obtener todas las reparaciones de un tipo de motor
    @GetMapping("/tipoMotor/{tipoMotor}")
    public ResponseEntity<List<ReparacionEntity>> mostrarReparacionesPorTipoMotor(@PathVariable("tipoMotor") String tipoMotor) {
        return ResponseEntity.ok(reparacionService.obtenerReparacionesPorTipoMotor(tipoMotor));
    }


    @GetMapping("/reparacion/{id}")
    public ResponseEntity<Optional<ReparacionEntity>> mostrarReparacion(@PathVariable Long id) {
        Optional<ReparacionEntity> reparacion = Optional.ofNullable(reparacionService.findById(id));
            ReparacionEntity reparacionEntity = reparacion.get();
            return ResponseEntity.ok(Optional.of(reparacionEntity));
        }
    @PostMapping("/crearReparacion")
    public ResponseEntity<ReparacionEntity> nuevaReparacion(
            @RequestBody ReparacionEntity reparacion) {
        return ResponseEntity.ok(reparacionService.guardarReparacion(reparacion));
    }

    @GetMapping("/crearReparacion")
    public ResponseEntity<ReparacionEntity> VehiculoForm() {
        return ResponseEntity.ok(new ReparacionEntity());
    }

    @PutMapping("/reparacion/monto")
    public ResponseEntity<String> updateMonto(@RequestBody ReparacionEntity reparacion) {
        // Update the total amount
        reparacionService.updateMontoTotal(reparacion).getFirst();
        // Custom response map containing both the updated entity and a separate string
        String additionalString = reparacionService.updateMontoTotal(reparacion).getSecond();
        
        return ResponseEntity.ok(additionalString);
    }

    @PutMapping("/reparacion")
    public ResponseEntity<ReparacionEntity> updateReparacion(@RequestBody ReparacionEntity reparacion){
        ReparacionEntity reparacionUpdated = reparacionService.updateReparacion(reparacion);
        return ResponseEntity.ok(reparacionUpdated);
    }

    @DeleteMapping("/reparacion/{reparacionId}")
    public ResponseEntity<Boolean> deleteReparacionById(@PathVariable Long reparacionId) throws Exception {
        var isDeleted = reparacionService.deleteReparacion(reparacionId);
        return ResponseEntity.noContent().build();
    }


}


