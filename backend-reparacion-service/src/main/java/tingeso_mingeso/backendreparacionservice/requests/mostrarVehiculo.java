package tingeso_mingeso.backendreparacionservice.requests;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tingeso_mingeso.backendreparacionservice.model.VehiculoEntity;

@Getter
@Setter
@NoArgsConstructor
public class mostrarVehiculo {
    VehiculoEntity vehiculo;
}