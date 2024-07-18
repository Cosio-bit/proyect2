package tingeso_mingeso.backendreparacionservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso_mingeso.backendreparacionservice.entity.PrecioEntity;
import tingeso_mingeso.backendreparacionservice.service.PrecioService;

import java.util.List;
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

    @GetMapping("/{id}")
    public ResponseEntity<PrecioEntity> mostrarPrecio(@PathVariable Long id) {
        Optional<PrecioEntity> precio = Optional.ofNullable(precioService.findById(id));
        return precio.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<PrecioEntity> nuevoPrecio(@RequestBody PrecioEntity precio) {
        return ResponseEntity.ok(precioService.guardarPrecio(precio));
    }

    @PutMapping("/")
    public ResponseEntity<PrecioEntity> updatePrecio(@RequestBody PrecioEntity precio) {
        PrecioEntity precioEntity = precioService.updatePrecio(precio);
        return ResponseEntity.ok(precioEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrecioById(@PathVariable Long id) {
        boolean isDeleted = precioService.deletePrecio(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
