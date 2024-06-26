package tingeso_mingeso.backendreparacionservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tingeso_mingeso.backendreparacionservice.entity.PrecioEntity;
import tingeso_mingeso.backendreparacionservice.model.VehiculoEntity;
import tingeso_mingeso.backendreparacionservice.repository.PrecioRepository;
import org.springframework.data.util.Pair;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Comparator;

@Service
public class PrecioService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PrecioRepository precioRepository;


    public ArrayList<PrecioEntity> obtenerPrecios(){
        return (ArrayList<PrecioEntity>) precioRepository.findAll();
    }

    public PrecioEntity guardarPrecio(PrecioEntity precio){
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
        return optionalPrecio.orElse(null);
    }

}