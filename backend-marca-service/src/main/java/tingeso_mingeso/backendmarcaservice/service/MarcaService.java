package tingeso_mingeso.backendmarcaservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tingeso_mingeso.backendmarcaservice.entity.MarcaEntity;
import tingeso_mingeso.backendmarcaservice.repository.MarcaRepository;

import java.util.ArrayList;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class MarcaService {
    @Autowired
    MarcaRepository marcaRepository;

    public ArrayList<MarcaEntity> obtenerMarcas(){
        return (ArrayList<MarcaEntity>) marcaRepository.findAll();
    }

    public MarcaEntity guardarMarca(MarcaEntity marca){
        int mes = marca.getFechaBono().getMonth().getValue();
        int anio = marca.getFechaBono().getYear();
        LocalDateTime fecha = LocalDateTime.of(anio, mes, 1, 0, 0);
        marca.setFechaBono(fecha);
        //si la marca ya existe para la fecha, sobre escribir la cantidad de bonos
        Optional<MarcaEntity> optionalMarca = Optional.ofNullable(marcaRepository.findByNombreAndFechaBono(marca.getFechaBono(), marca.getNombre()));
        if (optionalMarca.isPresent()) {
            MarcaEntity marcaExistente = optionalMarca.get();
            marcaExistente.setCantidadBonos(marcaExistente.getCantidadBonos() + marca.getCantidadBonos());
            marcaRepository.save(marcaExistente);
            return marcaExistente;
        }
        
        marcaRepository.save(marca);
        return marca;
    }
    public MarcaEntity updateMarca(MarcaEntity marca) {
        return marcaRepository.save(marca);
    }
    public boolean deleteMarca(Long id) throws Exception {
        try {
            marcaRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
    public MarcaEntity findById(Long marcaId) {
        Optional<MarcaEntity> optionalMarca = marcaRepository.findById(marcaId);
        return optionalMarca.orElse(null);
    }
    public Optional<MarcaEntity> findByNombre(String nombre) {
        Optional<MarcaEntity> optionalMarca = marcaRepository.findByNombre(nombre);
        return Optional.ofNullable(optionalMarca.orElse(null));
    }
    public MarcaEntity findByFechaBonoMarca(LocalDateTime fechaBono, String marca) {

        MarcaEntity optionalMarca = marcaRepository.findByNombreAndFechaBono(fechaBono, marca);
        //si la marca no existe o no le quedan bonos, retornar null
        if (optionalMarca == null || optionalMarca.getCantidadBonos() == 0) {
            return null;
        }
        optionalMarca.setCantidadBonos(optionalMarca.getCantidadBonos() - 1);
        marcaRepository.save(optionalMarca);

        return optionalMarca;
    }

}
