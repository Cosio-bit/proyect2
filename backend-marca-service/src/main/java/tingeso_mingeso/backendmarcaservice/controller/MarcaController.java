package tingeso_mingeso.backendmarcaservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tingeso_mingeso.backendmarcaservice.entity.MarcaEntity;
import tingeso_mingeso.backendmarcaservice.service.MarcaService;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/marcas")
@CrossOrigin("*")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping("/")
    public ResponseEntity<List<MarcaEntity>> listar() {
        return ResponseEntity.ok(marcaService.obtenerMarcas());
    }

    @GetMapping("/marca/{id}")
    public ResponseEntity<Optional<MarcaEntity>> mostrarMarca(@PathVariable Long id) {
        Optional<MarcaEntity> marca = Optional.ofNullable(marcaService.findById(id));
        MarcaEntity marcaEntity = marca.get();
        return ResponseEntity.ok(Optional.of(marcaEntity));
    }

    @PostMapping("/marca")
    public ResponseEntity<MarcaEntity> nuevaMarca(
            @RequestBody MarcaEntity marca) {
        return ResponseEntity.ok(marcaService.guardarMarca(marca));
    }

    @GetMapping("/marca")
    public ResponseEntity<MarcaEntity> MarcaForm() {
        return ResponseEntity.ok(new MarcaEntity());
    }

    @PutMapping("/marca")
    public ResponseEntity<MarcaEntity> updateMarca(@RequestBody MarcaEntity marca) {
        MarcaEntity marcaEntity = marcaService.updateMarca(marca);
        return ResponseEntity.ok(marcaEntity);
    }

    @DeleteMapping("/marca/{id}")
    public ResponseEntity<Boolean> deleteMarcaById(@PathVariable Long id) throws Exception {
        var isDeleted = marcaService.deleteMarca(id);
        return ResponseEntity.noContent().build();
    }
}
