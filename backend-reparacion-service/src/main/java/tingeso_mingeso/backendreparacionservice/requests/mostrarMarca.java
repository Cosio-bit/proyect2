package tingeso_mingeso.backendreparacionservice.requests;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class mostrarMarca {
    private Long id;
    private String nombre;
    private String fechaBono;
    private int descuento;
    private int cantidadBonos;
}