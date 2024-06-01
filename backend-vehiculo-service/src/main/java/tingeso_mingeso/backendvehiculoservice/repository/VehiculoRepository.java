package tingeso_mingeso.backendvehiculoservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tingeso_mingeso.backendvehiculoservice.Entities.VehiculoEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculoRepository extends JpaRepository<VehiculoEntity, Long> {
    //all queries
    @Query(value = "SELECT * FROM vehiculos WHERE id = :id", nativeQuery = true)
    Optional<VehiculoEntity> findById(@Param("id") Long id);

    @Query(value = "SELECT * FROM vehiculos WHERE patente = :patente", nativeQuery = true)
    Optional<VehiculoEntity> findByPatente(@Param("patente") String patente);

    @Query(value = "SELECT * FROM vehiculos WHERE marca = :marca", nativeQuery = true)
    List<VehiculoEntity> findByMarca(@Param("marca") String marca);

    @Query(value = "SELECT * FROM vehiculos WHERE anno_fabricacion = :annoFabricacion", nativeQuery = true)
    Optional<VehiculoEntity> findByAnnoFabricacion(@Param("annoFabricacion") String annoFabricacion);

    @Query(value = "SELECT * FROM vehiculos WHERE tipo_vehiculo = :tipoVehiculo", nativeQuery = true)
    List<VehiculoEntity> findByTipoVehiculo(@Param("tipoVehiculo") String tipoVehiculo);

    @Query(value = "SELECT * FROM vehiculos WHERE tipo_motor = :tipoMotor", nativeQuery = true)
    List<VehiculoEntity> findByTipoMotor(@Param("tipoMotor") String tipoMotor);

    @Query(value = "SELECT * FROM vehiculos WHERE nro_asientos = :nroAsientos", nativeQuery = true)
    List<VehiculoEntity> findByNroAsientos(@Param("nroAsientos") int nroAsientos);

    @Query(value = "SELECT * FROM vehiculos WHERE kilometraje = :kilometraje", nativeQuery = true)
    Optional<VehiculoEntity> findByKilometraje(@Param("kilometraje") int kilometraje);

    //find all vehiculos
    @Query(value = "SELECT * FROM vehiculos", nativeQuery = true)
    List<VehiculoEntity> findAllVehiculos();
    

}