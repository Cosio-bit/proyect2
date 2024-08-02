package tingeso_mingeso.backendvehiculoservice.entity;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "reparaciones")
@Getter
@Setter
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
