package tingeso_mingeso.backendreparacionservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tingeso_mingeso.backendreparacionservice.entity.PrecioEntity;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public interface PrecioRepository extends JpaRepository<PrecioEntity, Long> {
    //all queries
    @Query(value = "SELECT * FROM precios WHERE id = :id", nativeQuery = true)
    Optional<PrecioEntity> findById(@Param("id") Long id);

    @Query(value = "SELECT * FROM precios WHERE tipo_precio = :tipoPrecio", nativeQuery = true)
    Optional<PrecioEntity> findByTipoPrecio(@Param("tipoPrecio") String tipoPrecio);

    //find all precios
    @Query(value = "SELECT * FROM precios", nativeQuery = true)
    List<PrecioEntity> findAllPrecios();

    @Query(value = "SELECT * FROM precios WHERE precio_gasolina = :precioGasolina", nativeQuery = true)
    List<PrecioEntity> findByPrecioGasolina(@Param("precioGasolina") Integer precioGasolina);

    @Query(value = "SELECT * FROM precios WHERE precio_diesel = :precioDiesel", nativeQuery = true)
    List<PrecioEntity> findByPrecioDiesel(@Param("precioDiesel") Integer precioDiesel);

    @Query(value = "SELECT * FROM precios WHERE precio_hibrido = :precioHibrido", nativeQuery = true)
    List<PrecioEntity> findByPrecioHibrido(@Param("precioHibrido") Integer precioHibrido);

    @Query(value = "SELECT * FROM precios WHERE precio_electrico = :precioElectrico", nativeQuery = true)
    List<PrecioEntity> findByPrecioElectrico(@Param("precioElectrico") Integer precioElectrico);

    

}
