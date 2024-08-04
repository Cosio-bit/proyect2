package tingeso_mingeso.precio.entity;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "precios")
@Getter
@Setter
@NoArgsConstructor
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