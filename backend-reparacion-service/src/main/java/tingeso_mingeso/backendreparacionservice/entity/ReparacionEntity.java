package tingeso_mingeso.backendreparacionservice.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reparaciones")
@Getter
@Setter
@NoArgsConstructor
public class ReparacionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String idVehiculo;

    @Column(nullable = false)
    private LocalDateTime fechaHoraIngreso;

    @Column(nullable = false)
    private String tipoReparacion;

    @Column(nullable = true)
    private Integer montoTotal;

    @Column(nullable = true) // Assuming this field can be null
    private LocalDateTime fechaHoraSalida;

    @Column(nullable = true) // Assuming this field can be null
    private LocalDateTime fechaHoraRetiro;

    @Column(nullable = true) // Assuming this field can be null
    private int bono = 0;

    @Column(nullable = true) // Assuming this field can be null
    private int porcentaje = 0;

    @Column(nullable = true) // Assuming this field can be null
    private int montoBruto = 0;


}