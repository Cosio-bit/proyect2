package tingeso_mingeso.reparacion.model;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class VehiculoEntity {
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
