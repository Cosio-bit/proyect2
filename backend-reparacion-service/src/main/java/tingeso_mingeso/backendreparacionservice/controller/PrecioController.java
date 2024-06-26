package tingeso_mingeso.backendreparacionservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso_mingeso.backendreparacionservice.entity.PrecioEntity;
import tingeso_mingeso.backendreparacionservice.entity.ReparacionEntity;
import tingeso_mingeso.backendreparacionservice.model.MarcaEntity;
import tingeso_mingeso.backendreparacionservice.service.PrecioService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/precios")
@CrossOrigin("*")
public class PrecioController {

    @Autowired
    private PrecioService precioService;


    @GetMapping("/")
    public ResponseEntity<List<PrecioEntity>> listar() {
        return ResponseEntity.ok(precioService.obtenerPrecios());
    }

    @GetMapping("/precio/{id}")
    public ResponseEntity<Optional<PrecioEntity>> mostrarPrecio(@PathVariable Long id) {
        Optional<PrecioEntity> precio = Optional.ofNullable(precioService.findById(id));
        PrecioEntity precioEntity = precio.get();
        return ResponseEntity.ok(Optional.of(precioEntity));
    }

    @PostMapping("/precio")
    public ResponseEntity<PrecioEntity> nuevoPrecio(
            @RequestBody PrecioEntity precio) {
        return ResponseEntity.ok(precioService.guardarPrecio(precio));
    }

    @GetMapping("/precio")
    public ResponseEntity<PrecioEntity> PrecioForm() {
        return ResponseEntity.ok(new PrecioEntity());
    }

    @PutMapping("/precio")
    public ResponseEntity<PrecioEntity> updatePrecio(@RequestBody PrecioEntity precio) {
        PrecioEntity precioEntity = precioService.updatePrecio(precio);
        return ResponseEntity.ok(precioEntity);
    }

    @DeleteMapping("/precio/{id}")
    public ResponseEntity<Boolean> deletePrecioById(@PathVariable Long id) throws Exception {
        var isDeleted = precioService.deletePrecio(id);
        return ResponseEntity.noContent().build();
    }


}


