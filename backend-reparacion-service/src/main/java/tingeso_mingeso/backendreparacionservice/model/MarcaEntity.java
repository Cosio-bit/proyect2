package tingeso_mingeso.backendreparacionservice.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class MarcaEntity {
    private Long id;

    private String nombre;
    private LocalDateTime fechaBono;
    private int descuento;
    private int cantidadBonos;

}
