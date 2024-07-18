package tingeso_mingeso.backendprecioservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso_mingeso.backendprecioservice.entity.PrecioEntity;
import tingeso_mingeso.backendprecioservice.service.PrecioService;

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

    @GetMapping("/precio/{id}")
    public ResponseEntity<PrecioEntity> mostrarPrecio(@PathVariable Long id) {
        Optional<PrecioEntity> precio = Optional.ofNullable(precioService.findById(id));
        return precio.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/precio")
    public ResponseEntity<PrecioEntity> nuevoPrecio(@RequestBody PrecioEntity precio) {
        return ResponseEntity.ok(precioService.guardarPrecio(precio));
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
