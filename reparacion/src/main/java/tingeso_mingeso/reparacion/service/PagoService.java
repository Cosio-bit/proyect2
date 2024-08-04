package tingeso_mingeso.reparacion.service;

import lombok.Data;
import org.springframework.core.ParameterizedTypeReference;

import tingeso_mingeso.reparacion.clients.MarcaFeignClient;
import tingeso_mingeso.reparacion.clients.VehiculoFeignClient;
import tingeso_mingeso.reparacion.entity.ReparacionEntity;
import tingeso_mingeso.reparacion.model.MarcaEntity;
import tingeso_mingeso.reparacion.model.VehiculoEntity;
import tingeso_mingeso.reparacion.repository.ReparacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;


import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;

@Data
@Service
public class PagoService {

    @Autowired
    ReparacionRepository reparacionRepository;
    @Autowired
    RestTemplate restTemplate;

    MarcaFeignClient marcaFeignClient;
    VehiculoFeignClient vehiculoFeignClient;


    // Definir una matriz de precios donde las filas representan los tipos de reparaciones
// y las columnas representan los tipos de motor.
    double[][] preciosMotor = {
            // tipo de motor 1, 2, 3, 4 respectivamente
            {120000, 120000, 180000, 220000},
            {130000, 130000, 190000, 230000},
            {350000, 450000, 700000, 800000},
            {210000, 210000, 300000, 300000},
            {150000, 150000, 200000, 250000},
            {100000, 120000, 450000, 0},
            {100000, 100000, 100000, 100000},
            {180000, 180000, 210000, 250000},
            {150000, 150000, 180000, 180000},
            {130000, 140000, 220000, 0},
            {80000, 80000, 80000, 80000}

    };

    double[][] descuentosMotor = {
            // tipo de motor 1, 2, 3, 4 respectivamente
            {0.05, 0.07, 0.10, 0.08}, // 1
            {0.05, 0.07, 0.10, 0.08}, // 2
            {0.10, 0.12, 0.15, 0.13}, // 3
            {0.10, 0.12, 0.15, 0.13}, // 4
            {0.10, 0.12, 0.15, 0.13}, // 5
            {0.15, 0.17, 0.20, 0.18}, // 6
            {0.15, 0.17, 0.20, 0.18}, // 7
            {0.15, 0.17, 0.20, 0.18}, // 8
            {0.15, 0.17, 0.20, 0.18}, // 9
            {0.20, 0.22, 0.25, 0.23}  // 10
    };

    double[][] recargoKilometraje = {
            // tipos de autos 1,2,3,4,5 respectivamente
            {0.00, 0.00, 0.00, 0.00, 0.00}, // 0 – 5.000
            {0.03, 0.03, 0.05, 0.05, 0.05}, // 5.001 – 12.000
            {0.07, 0.07, 0.09, 0.09, 0.09}, // 12.001 – 25.000
            {0.12, 0.12, 0.12, 0.12, 0.12}, // 25.001 – 40.000
            {0.20, 0.20, 0.20, 0.20, 0.20}  // 40.000 – más

    };

    double[][] recargoAntiguedad = {
            // tipos de autos 1,2,3,4,5 respectivamente
            {0.00, 0.00, 0.00, 0.00, 0.00}, // 0 – 5
            {0.05, 0.05, 0.07, 0.07, 0.07}, // 6 – 10
            {0.09, 0.09, 0.11, 0.11, 0.11}, // 11 – 15
            {0.15, 0.15, 0.20, 0.20, 0.20}  // 16 – más
    };

    String[] motores = {"Gasolina", "Diésel", "Híbrido", "Eléctrico"};

    String[] tipoAuto = {"Sedán", "Hatchback", "SUV", "Pickup", "Furgoneta"};


    public int numeroMotor(ReparacionEntity reparacion, VehiculoEntity vehiculo) {
        String motor = vehiculo != null ? vehiculo.getTipoMotor() : null;
        // Encontrar el índice del tipo de motor en el array motores
        int motorNum = 0;
        if (motor != null) {
            for (int i = 0; i < motores.length; i++) {
                if (motores[i].equals(motor)) {
                    motorNum = i;
                    break;
                }
            }
        }
    
        return motorNum;
    }
    

public int numeroTipoVehiculo(ReparacionEntity reparacion, VehiculoEntity vehiculo) {
    String tipo = vehiculo != null ? vehiculo.getTipoVehiculo() : null;
    // Encontrar el índice del tipo de vehículo en el array tipoAuto
    int tipoNum = 0;
    if (tipo != null) {
        for (int i = 0; i < tipoAuto.length; i++) {
            if (tipoAuto[i].equals(tipo)) {
                tipoNum = i;
                break;
            }
        }
    }

    return tipoNum;
}


    public double precioReparacionVSMotor(ReparacionEntity reparacion, VehiculoEntity vehiculo) {
        //obtener el tipo de motor del vehiculo
        int motorNum = numeroMotor(reparacion, vehiculo);
        //sea una string separada por comas con los tipos de reparacion, obtener cada tipo de reparacion en un arreglo donde cada vez que se encuentre una coma se separa
        String tipoReparacion = reparacion.getTipoReparacion();
        String[] tipoReparacionArray = tipoReparacion.split(",");
        int montoTotal = 0;
        for (String s : tipoReparacionArray) {
            // si es "" no se hace nada
            if (s.isEmpty()) {
                continue;
            }
            int tipoReparacionNum = Integer.parseInt(s);
            montoTotal += preciosMotor[tipoReparacionNum][motorNum];
        }
        return montoTotal;
    }

    public double descuentoCantidadReparaciones(ReparacionEntity reparacion, VehiculoEntity vehiculo) {
        int cantidadReparaciones = reparacionRepository.findByVehiculoID(reparacion.getIdVehiculo()).size();
        //print in console the cantidadReparaciones
        //si cantidad de reparaciones supera 10 entonces cantidadReparaciones = 9
        if (cantidadReparaciones >= 10) {
            cantidadReparaciones = 9;
        }
        //obtener el NUMERO de motor del vehiculo
        int motorNum = numeroMotor(reparacion, vehiculo);
        return descuentosMotor[cantidadReparaciones][motorNum];
    }

    public double descuentoDiaAtencion(ReparacionEntity reparacion) {
        //obtener la fecha de la reparacion
        LocalDateTime fechaReparacion = reparacion.getFechaHoraIngreso();
        int diaSemana = fechaReparacion.getDayOfWeek().getValue();
        int horaIngreso = fechaReparacion.getHour();
        //si la reparacion se realiza un dia lunes o jueves entre las  09:00 hrs y las 12:00 hrs. se aplica un descuento del 10%
        if ((diaSemana == 1 || diaSemana == 4) && (horaIngreso >= 9 && horaIngreso <= 12)) {
            return 0.1;
        }
        return 0;
    }

public double descuentoMarca(ReparacionEntity reparacion, VehiculoEntity vehiculo) {
    String marca = vehiculo != null ? vehiculo.getMarca() : null;
    if (marca == null) {
        return 0;
    }
    // Obtener la fecha de ingreso de la reparación
    int mes = reparacion.getFechaHoraIngreso().getMonth().getValue();
    int anio = reparacion.getFechaHoraIngreso().getYear();
    LocalDateTime fechaReparacion = LocalDateTime.of(anio, mes, 1, 0, 0);

    // String url = "http://backend-marca-service/api/v1/marcas/" + marca;
    // // Hacer la solicitud para obtener la marca
    // ResponseEntity<MarcaEntity> responseEntity = restTemplate.exchange(
    //         url,
    //         HttpMethod.GET,
    //         null,
    //         new ParameterizedTypeReference<MarcaEntity>() {}
    // );

    // Obtener la marca del objeto recibido
    //string to long
    Long marcaLong = Long.parseLong(marca);
    MarcaEntity marcaEntity = marcaFeignClient.mostrarMarca(marcaLong).get();
    if (marcaEntity == null) {
        return 0;
    }
    // Obtener la cantidad de bonos de la marca
    int cantidadBonos = marcaEntity.getCantidadBonos();
    // Obtener si es que reparaciones tiene bono
    int bono = reparacion.getBono();

    //si bono es 1 o la cantidad de bonos es mayor a 0, se aplica el descuento
    if (bono == 1 || cantidadBonos > 0) {
        marcaEntity.setCantidadBonos(cantidadBonos - 1);
        //restTemplate.put(url, marcaEntity);
        return marcaEntity.getDescuento();
    }
    return 0;
}


public double recargoKilometraje(ReparacionEntity reparacion, VehiculoEntity vehiculo) {
    int kilometraje = vehiculo != null ? vehiculo.getKilometraje() : 0;
    // Obtener el tipo de vehículo
    int tipoAutoNum = numeroTipoVehiculo(reparacion, vehiculo);

    // Determinar el recargo basado en el kilometraje
    if (kilometraje <= 5000) {
        return recargoKilometraje[4][tipoAutoNum];
    } else if (kilometraje <= 12000) {
        return recargoKilometraje[4][tipoAutoNum];
    } else if (kilometraje <= 25000) {
        return recargoKilometraje[4][tipoAutoNum];
    } else if (kilometraje <= 40000) {
        return recargoKilometraje[4][tipoAutoNum];
    } else {
        return recargoKilometraje[4][tipoAutoNum];
    }
}


public double recargoAntiguedadVehiculo(ReparacionEntity reparacion, VehiculoEntity vehiculo) {
    String annoFabricacionStr = vehiculo != null ? vehiculo.getAnnoFabricacion() : null;
    // Parsing the string to an integer
    int fechaFabricacion = annoFabricacionStr != null ? Integer.parseInt(annoFabricacionStr) : 0;
    // Obtener la fecha de la reparación
    int fechaReparacion = reparacion.getFechaHoraIngreso().toLocalDate().getYear();
    // Obtener el tipo de auto
    int tipoAutoNum = numeroTipoVehiculo(reparacion, vehiculo);
    int diferenciaAnios = fechaReparacion - fechaFabricacion;
    // Determinar el recargo basado en la antigüedad del vehículo
    if (diferenciaAnios <= 5) {
        return recargoAntiguedad[0][tipoAutoNum];
    } else if (diferenciaAnios <= 10) {
        return recargoAntiguedad[1][tipoAutoNum];
    } else if (diferenciaAnios <= 15) {
        return recargoAntiguedad[2][tipoAutoNum];
    } else {
        return recargoAntiguedad[3][tipoAutoNum];
    }
}


    public double recargoDiasDesdeSalida(ReparacionEntity reparacion) {
        //obtener la fecha de la reparacion
        LocalDateTime fechaSalida = reparacion.getFechaHoraSalida();
        LocalDateTime fechaRetiro = reparacion.getFechaHoraRetiro();
        //obtener la cantidad de dias entre la fecha de salida y la fecha de retiro
        int diasDiferencia = Period.between(fechaSalida.toLocalDate(), fechaRetiro.toLocalDate()).getDays();
        //si la cantidad de dias es mayor a 3 se aplica un recargo del 10%
        if (diasDiferencia <= 0) {
            return 0;
        }
        return (diasDiferencia * 5) * 0.01;
    }

    public double recargos(ReparacionEntity reparacion, VehiculoEntity vehiculo) {
        if (reparacion.getFechaHoraSalida() == null || reparacion.getFechaHoraRetiro() == null) {
            return recargoKilometraje(reparacion, vehiculo) + recargoAntiguedadVehiculo(reparacion, vehiculo);
        }

        return recargoKilometraje(reparacion, vehiculo) + recargoAntiguedadVehiculo(reparacion, vehiculo) + recargoDiasDesdeSalida(reparacion);
    }

    public String calcularPago(ReparacionEntity reparacion) {
        // Construir la URL para obtener el vehículo por ID
        // String url = "http://backend-vehiculo-service/api/v1/vehiculos/vehiculo" + reparacion.getIdVehiculo();
        // // Hacer la solicitud para obtener el vehículo
        // ResponseEntity<VehiculoEntity> responseEntity = restTemplate.exchange(
        //         url,
        //         HttpMethod.GET,
        //         null,
        //         new ParameterizedTypeReference<VehiculoEntity>() {}
        // );
        // Obtener el tipo de motor del objeto recibido
        Long vehiculoLong = Long.parseLong(reparacion.getIdVehiculo());
        VehiculoEntity vehiculo = vehiculoFeignClient.mostrarVehiculo(vehiculoLong).get();

        double montoBruto = precioReparacionVSMotor(reparacion, vehiculo);
        //guardar el montobruto en la reparacion
        double descuento = descuentoCantidadReparaciones(reparacion,vehiculo) + descuentoDiaAtencion(reparacion);
        double recargo = recargos(reparacion, vehiculo);
        double descuentoMarca = descuentoMarca(reparacion, vehiculo);
        double iva = 0.19;
        // Round up each calculated value to ensure it doesn't exceed the bounds of an int
        double total = Math.ceil(montoBruto - (montoBruto * descuento) + (montoBruto * recargo) + (montoBruto * iva) - descuentoMarca);
        double porcentajes =  recargo + iva - descuento - descuentoMarca/montoBruto;
        //guardar el porcentaje en la reparacion
        //make a string with all the values
        String totalPagarSTR = "monto: " + String.valueOf(montoBruto) + "\n descuento: " + String.valueOf(descuento*montoBruto) + "\n recargo: " + String.valueOf(recargo*montoBruto) + "\n descuentoMarca: " + String.valueOf(descuentoMarca)  + "\n iva a pagar: " + String.valueOf(iva*montoBruto) + "\n total con iva: " + String.valueOf(total);
        // Convert the total to an int
        reparacion.setPorcentaje((int) porcentajes);
        reparacion.setMontoBruto((int) montoBruto);
        reparacion.setMontoTotal((int) total);
        reparacionRepository.save(reparacion);
        return totalPagarSTR;
    }



    
}