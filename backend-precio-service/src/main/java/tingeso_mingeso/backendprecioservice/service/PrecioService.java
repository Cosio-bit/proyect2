package tingeso_mingeso.backendreparacionservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import tingeso_mingeso.backendreparacionservice.entity.PrecioEntity;
import tingeso_mingeso.backendreparacionservice.repository.PrecioRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PrecioService {

    @Autowired
    private PrecioRepository precioRepository;

    public List<PrecioEntity> obtenerPrecios() {
        return precioRepository.findAll();
    }

    public PrecioEntity guardarPrecio(PrecioEntity precio) {
        return precioRepository.save(precio);
    }

    public PrecioEntity updatePrecio(PrecioEntity precio) {
        return precioRepository.save(precio);
    }

    public boolean deletePrecio(Long id) {
        try {
            precioRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            // Handle case when the entity with the given id doesn't exist
            return false;
        } catch (Exception e) {
            // Handle other exceptions if needed
            throw new RuntimeException("Failed to delete precio with id: " + id, e);
        }
    }

    public PrecioEntity findById(Long precioId) {
        Optional<PrecioEntity> optionalPrecio = precioRepository.findById(precioId);
        return optionalPrecio.orElse(null); // Return null if not found
    }
}
