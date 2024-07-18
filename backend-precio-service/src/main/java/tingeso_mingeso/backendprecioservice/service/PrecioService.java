package tingeso_mingeso.backendprecioservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import tingeso_mingeso.backendprecioservice.entity.PrecioEntity;
import tingeso_mingeso.backendprecioservice.repository.PrecioRepository;

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

    public boolean deletePrecio(Long id) throws Exception {
        try {
            precioRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public PrecioEntity findById(Long precioId) {
        Optional<PrecioEntity> optionalPrecio = precioRepository.findById(precioId);
        return optionalPrecio.orElse(null); // Return null if not found
    }
}
