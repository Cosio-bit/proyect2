package tingeso_mingeso.backendreparacionservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehiculoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patente;
    private String marca;
    private String modelo;
    private String annoFabricacion;
    private String tipoVehiculo;
    private String tipoMotor;
    private Integer nroAsientos;
    private Integer kilometraje;


}
