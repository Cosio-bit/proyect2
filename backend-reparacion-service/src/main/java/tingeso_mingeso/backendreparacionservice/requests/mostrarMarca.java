package tingeso_mingeso.backendreparacionservice.requests;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tingeso_mingeso.backendreparacionservice.model.MarcaEntity;

@Getter
@Setter
@NoArgsConstructor
public class mostrarMarca {
    MarcaEntity marca;
}