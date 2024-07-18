package tingeso_mingeso.backendprecioservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "precios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrecioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(nullable = false)
    private String tipoPrecio;

    @Column(nullable = true)
    private Integer precioGasolina;

    @Column(nullable = true)
    private Integer precioDiesel;

    @Column(nullable = true)
    private Integer precioHibrido;

    @Column(nullable = true)
    private Integer precioElectrico;


}