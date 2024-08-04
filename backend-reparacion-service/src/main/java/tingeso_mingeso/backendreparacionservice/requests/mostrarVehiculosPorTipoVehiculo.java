package tingeso_mingeso.backendreparacionservice.requests;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tingeso_mingeso.backendreparacionservice.model.VehiculoEntity;

@Getter
@Setter
@NoArgsConstructor
public class mostrarVehiculosPorTipoVehiculo {
    List<VehiculoEntity> vehiculos;
}