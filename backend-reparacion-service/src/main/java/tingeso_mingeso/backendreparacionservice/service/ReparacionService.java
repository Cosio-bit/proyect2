package tingeso_mingeso.backendreparacionservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import tingeso_mingeso.backendreparacionservice.clients.MarcaFeignClient;
import tingeso_mingeso.backendreparacionservice.clients.VehiculoFeignClient;
import tingeso_mingeso.backendreparacionservice.entity.ReparacionEntity;
import tingeso_mingeso.backendreparacionservice.model.VehiculoEntity;
import tingeso_mingeso.backendreparacionservice.repository.ReparacionRepository;
import org.springframework.data.util.Pair;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Comparator;

@Service
public class ReparacionService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ReparacionRepository reparacionRepository;

    @Autowired
    private PagoService pagoService;

    MarcaFeignClient  marcaFeignClient;
    VehiculoFeignClient vehiculoFeignClient;


    public ArrayList<ReparacionEntity> obtenerReparaciones(){
        return (ArrayList<ReparacionEntity>) reparacionRepository.findAll();
    }

    public ArrayList<ReparacionEntity> obtenerReparacionesPorIdVehiculo(String idVehiculo) {
        return (ArrayList<ReparacionEntity>)  reparacionRepository.findByVehiculoID(idVehiculo);
    }

    public ReparacionEntity guardarReparacion(ReparacionEntity reparacion){
        return reparacionRepository.save(reparacion);
    }

    public ReparacionEntity updateReparacion(ReparacionEntity reparacion) {
        return reparacionRepository.save(reparacion);
    }

    public boolean deleteReparacion(Long id) throws Exception {
        try {
            reparacionRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public ReparacionEntity findById(Long reparacionId) {
        Optional<ReparacionEntity> optionalReparacion = reparacionRepository.findById(reparacionId);
        return optionalReparacion.orElse(null);
    }

    public Pair<ReparacionEntity, String> updateMontoTotal(ReparacionEntity reparacion){
        String stringInfo = String.valueOf(pagoService.calcularPago(reparacion));
        return Pair.of(reparacion, stringInfo);
    }

    // Función para obtener reparaciones por tipo de motor de vehículo
    public List<ReparacionEntity> obtenerReparacionesPorTipoMotor(String tipoMotor) {
        // ResponseEntity<List<VehiculoEntity>> responseEntity = restTemplate.exchange(
        //         "http://backend-vehiculo-service/api/v1/vehiculos/tipoMotor/" + tipoMotor,
        //         HttpMethod.GET,
        //         null,
        //         new ParameterizedTypeReference<List<VehiculoEntity>>() {}
        // );

        List<VehiculoEntity> vehiculos = vehiculoFeignClient.mostrarVehiculosPorTipoMotor(tipoMotor);
        List<ReparacionEntity> reparaciones = new ArrayList<>();
        if (vehiculos != null) {
            for (VehiculoEntity vehiculo : vehiculos) {
                reparaciones.addAll(reparacionRepository.findByVehiculoID(vehiculo.getId().toString()));
            }
        }
        return reparaciones;
    }

    // Función para obtener reparaciones por tipo de vehículo
    public List<ReparacionEntity> obtenerReparacionesPorTipoVehiculo(String tipoVehiculo) {
        // ResponseEntity<List<VehiculoEntity>> responseEntity = restTemplate.exchange(
        //         "http://backend-vehiculo-service/api/v1/vehiculos/tipoVehiculo/" + tipoVehiculo,
        //         HttpMethod.GET,
        //         null,
        //         new ParameterizedTypeReference<List<VehiculoEntity>>() {}
        // );

        List<VehiculoEntity> vehiculos = vehiculoFeignClient.mostrarVehiculosPorTipoVehiculo(tipoVehiculo);
        List<ReparacionEntity> reparaciones = new ArrayList<>();
        if (vehiculos != null) {
            for (VehiculoEntity vehiculo : vehiculos) {
                reparaciones.addAll(reparacionRepository.findByVehiculoID(vehiculo.getId().toString()));
            }
        }
        return reparaciones;
    }

    // Función para obtener reparaciones por marca de vehículo
    public List<ReparacionEntity> obtenerReparacionesPorMarca(String marca) {
        // ResponseEntity<List<VehiculoEntity>> responseEntity = restTemplate.exchange(
        //         "http://backend-vehiculo-service/api/v1/vehiculos/marca/" + marca,
        //         HttpMethod.GET,
        //         null,
        //         new ParameterizedTypeReference<List<VehiculoEntity>>() {}
        // );

        List<VehiculoEntity> vehiculos = vehiculoFeignClient.mostrarVehiculosPorMarca(marca);
        List<ReparacionEntity> reparaciones = new ArrayList<>();
        if (vehiculos != null) {
            for (VehiculoEntity vehiculo : vehiculos) {
                reparaciones.addAll(reparacionRepository.findByVehiculoID(vehiculo.getId().toString()));
            }
        }

        // Ordenar reparaciones por duración neta y manejar reparaciones sin fechaHoraSalida
        reparaciones.sort(new Comparator<ReparacionEntity>() {
            public int compare(ReparacionEntity reparacion1, ReparacionEntity reparacion2) {
                // Calcular duración neta (salida - ingreso) para ambas reparaciones
                long duracionNeta1 = getDuracionNeta(reparacion1);
                long duracionNeta2 = getDuracionNeta(reparacion2);

                // Comparar por duración neta
                return Long.compare(duracionNeta1, duracionNeta2);
            }

            // Función para calcular la duración neta de una reparación
            private long getDuracionNeta(ReparacionEntity reparacion) {
                if (reparacion.getFechaHoraSalida() != null) {
                    return java.time.Duration.between(reparacion.getFechaHoraIngreso(), reparacion.getFechaHoraSalida()).toMillis();
                } else {
                    // Si la fechaHoraSalida es null, colocar al final de la lista
                    return Long.MAX_VALUE;
                }
            }
        });

        return reparaciones;
    }

    public int obtenerCantidadReparacionesPorTipoVehiculoYReparacion(String tipoVehiculo, String tipoReparacion) {
        // Obtener reparaciones por tipo de vehículo
        List<ReparacionEntity> reparacionesTipoVehiculo = obtenerReparacionesPorTipoVehiculo(tipoVehiculo);
        // Contar reparaciones por tipo de reparación
        int cantidadTipoReparacion = 0;
        for (ReparacionEntity reparacion : reparacionesTipoVehiculo) {
            //Tipo reparacion es una string que contiene los tipos de reparaciones, revisar si contiene el tipo de reparacion
            if (reparacion.getTipoReparacion().contains(tipoReparacion)) {
                cantidadTipoReparacion++;
            }
        }
        return cantidadTipoReparacion;

    }

    public double obtenerMontoReparacionesPorTipoVehiculoYReparacion(String tipoVehiculo, String tipoReparacion) {
        List<ReparacionEntity> reparacionesTipoVehiculo = obtenerReparacionesPorTipoVehiculo(tipoVehiculo);
        double montoTotal = 0;
        //parse tipoReparacion a integer
        int intTipo = Integer.parseInt(tipoReparacion);
        for (ReparacionEntity reparacion : reparacionesTipoVehiculo) {
            if (reparacion.getTipoReparacion().contains(tipoReparacion)) {
                //obtener el vehiculo a partir de la reparacion para obtener los precios que estan ligados al motor
                // ResponseEntity<VehiculoEntity> responseEntity = restTemplate.exchange(
                //         "http://backend-vehiculo-service/api/v1/vehiculos/" + reparacion.getIdVehiculo(),
                //         HttpMethod.GET,
                //         null,
                //         new ParameterizedTypeReference<VehiculoEntity>() {}
                // );
                //from string to long
                Long idVehiculo = Long.parseLong(reparacion.getIdVehiculo());
                VehiculoEntity vehiculo = vehiculoFeignClient.mostrarVehiculo(idVehiculo).get();
                int intMotor = pagoService.numeroMotor(reparacion, vehiculo);
                int porcentaje = reparacion.getPorcentaje();
                montoTotal = pagoService.preciosMotor[intTipo][intMotor] * porcentaje;
            }
            
        }
        return montoTotal;
    }

    //obtener cantidad de reparaciones por tipo de reparacion y mes
    public int obtenerCantidadReparacionesPorTipoReparacionYMes(String tipoReparacion, int mes) {
        List<ReparacionEntity> reparaciones = obtenerReparaciones();
        int cantidadTipoReparacion = 0;
        for (ReparacionEntity reparacion : reparaciones) {
            if (reparacion.getTipoReparacion().contains(tipoReparacion) && reparacion.getFechaHoraIngreso().getMonthValue() == mes) {
                cantidadTipoReparacion++;
            }
        }
        return cantidadTipoReparacion;
    }

    // obtener cantidad de reparaciones por tipo de reparacion y mes, luego, obtener cantidad de reparaciones de los dos meses anteriores
    public List<Integer> obtenerCantidadReparacionesPorTipoReparacionYMesYDosMesesAnteriores(String tipoReparacion, int mes) {
        int cantidadTipoReparacion = obtenerCantidadReparacionesPorTipoReparacionYMes(tipoReparacion, mes);
        int cantidadTipoReparacionMesAnterior = obtenerCantidadReparacionesPorTipoReparacionYMes(tipoReparacion, mes - 1);
        int cantidadTipoReparacionDosMesesAnteriores = obtenerCantidadReparacionesPorTipoReparacionYMes(tipoReparacion, mes - 2);
        return List.of(cantidadTipoReparacion, cantidadTipoReparacionMesAnterior, cantidadTipoReparacionDosMesesAnteriores);
    }

    //comparar la variacion porcentual entre un mes vs el mes anterior y un mes vs dos meses anteriores
    public List<Double> obtenerVariacionPorcentualReparacionesPorTipoReparacionYMesYDosMesesAnteriores(String tipoReparacion, int mes) {
        int cantidadTipoReparacion = obtenerCantidadReparacionesPorTipoReparacionYMes(tipoReparacion, mes);
        int cantidadTipoReparacionMesAnterior = obtenerCantidadReparacionesPorTipoReparacionYMes(tipoReparacion, mes - 1);
        int cantidadTipoReparacionDosMesesAnteriores = obtenerCantidadReparacionesPorTipoReparacionYMes(tipoReparacion, mes - 2);
        double variacionPorcentualMesAnterior = 0;
        double variacionPorcentualDosMesesAnteriores = 0;
        if (cantidadTipoReparacionMesAnterior != 0) {
            variacionPorcentualMesAnterior = ((double) cantidadTipoReparacion - cantidadTipoReparacionMesAnterior) / cantidadTipoReparacionMesAnterior * 100;
        }
        if (cantidadTipoReparacionDosMesesAnteriores != 0) {
            variacionPorcentualDosMesesAnteriores = ((double) cantidadTipoReparacion - cantidadTipoReparacionDosMesesAnteriores) / cantidadTipoReparacionDosMesesAnteriores * 100;
        }
        return List.of(variacionPorcentualMesAnterior, variacionPorcentualDosMesesAnteriores);
    }


    //obtener desde una reparacion, el vehiculo
    public VehiculoEntity obtenerVehiculoDeReparacion(ReparacionEntity reparacion){
    // ResponseEntity<VehiculoEntity> responseEntity = restTemplate.exchange(
    //         "http://backend-vehiculo-service/api/v1/vehiculos/" + reparacion.getIdVehiculo(),
    //         HttpMethod.GET,
    //         null,
    //         new ParameterizedTypeReference<VehiculoEntity>() {}
    // );
        Long idVehiculo = Long.parseLong(reparacion.getIdVehiculo());
        return vehiculoFeignClient.mostrarVehiculo(idVehiculo).get();
    }

    //desde una reparacion, devolver vehiculo y reparacion
    public List<Object> obtenerReparacionYVehiculo(Long id){
        ReparacionEntity reparacion = findById(id);
        VehiculoEntity vehiculo = obtenerVehiculoDeReparacion(reparacion);
        return List.of(reparacion, vehiculo);
    }

    
}
