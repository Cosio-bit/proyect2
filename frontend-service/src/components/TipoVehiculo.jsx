import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// eslint-disable-next-line react/prop-types
function DropdownTipoVehiculo({onChange }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, ] = useState(["Sedan", "Hatchback", "SUV", "Pickup", "Furgoneta"]);
  const [, setTipoVehiculo] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setTipoVehiculo(event.target.value);
    onChange(event.target.value);
  };


  return (
    <FormControl fullWidth>
      <InputLabel id="tipoVehiculo-label" style={{ color: "#f0f0f0" }}>Tipo de Vehiculo</InputLabel>
      <Select
        labelId="tipoVehiculo-label"
        id="tipoVehiculo"
        value={selectedOption}
        onChange={handleChange}
        inputProps={{
          style: { color: "#f0f0f0" }
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}
      </Select>
     
    </FormControl>
  );
}

export default DropdownTipoVehiculo;
