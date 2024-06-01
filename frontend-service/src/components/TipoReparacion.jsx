import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// eslint-disable-next-line react/prop-types
function DropdownTipoReparacion({onChange}) {
  const [selectedOptions, setSelectedOptions] = useState('');

  const handleChange = (event) => {
    const selectedValues = event.target.value.join(',');
    setSelectedOptions(selectedValues);
    onChange(selectedValues);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="tipoReparacion-label" style={{ color: "#f0f0f0" }}>Tipo de Reparación</InputLabel>
      <Select
        labelId="tipoReparacion-label"
        id="tipoReparacion"
        multiple
        value={selectedOptions.split(',')}
        onChange={handleChange}
        inputProps={{
          style: { color: "#f0f0f0" }
        }}
      >
        <MenuItem value="0">Reparaciones del Sistema de Frenos</MenuItem>
        <MenuItem value="1">Servicio del Sistema de Refrigeración</MenuItem>
        <MenuItem value="2">Reparaciones del Motor</MenuItem>
        <MenuItem value="3">Reparaciones de la Transmisión</MenuItem>
        <MenuItem value="4">Reparación del Sistema Eléctrico</MenuItem>
        <MenuItem value="5">Reparaciones del Sistema de Escape</MenuItem>
        <MenuItem value="6">Reparación de Neumáticos y Ruedas</MenuItem>
        <MenuItem value="7">Reparaciones de la Suspensión y la Dirección</MenuItem>
        <MenuItem value="8">Reparación del Sistema de Aire Acondicionado y Calefacción</MenuItem>
        <MenuItem value="9">Reparaciones del Sistema de Combustible</MenuItem>
        <MenuItem value="10">Reparación y Reemplazo del Parabrisas y Cristales</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropdownTipoReparacion;


