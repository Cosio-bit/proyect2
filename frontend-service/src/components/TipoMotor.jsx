import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// eslint-disable-next-line react/prop-types
function DropdownTipoMotor({ onChange }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [options,] = useState(["Gasolina", "Diésel", "Híbrido", "Eléctrico"]);
  const [, setTipoMotor] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setTipoMotor(event.target.value);
    onChange(event.target.value);
  };


  return (
    <FormControl fullWidth>
      <InputLabel id="tipoMotor-label" style={{ color: "#f0f0f0" }}>Tipo de Motor</InputLabel>
      <Select
        labelId="tipoMotor-label"
        id="tipoMotor"
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

export default DropdownTipoMotor;
