package tingeso_mingeso.reparacion.requests;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tingeso_mingeso.reparacion.model.VehiculoEntity;

@Getter
@Setter
@NoArgsConstructor
public class mostrarVehiculosPorTipoMotor {
    List<VehiculoEntity> vehiculos;
}