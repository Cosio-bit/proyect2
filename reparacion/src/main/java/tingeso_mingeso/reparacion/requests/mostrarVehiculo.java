package tingeso_mingeso.reparacion.requests;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tingeso_mingeso.reparacion.model.VehiculoEntity;

@Getter
@Setter
@NoArgsConstructor
public class mostrarVehiculo {
    VehiculoEntity vehiculo;
}