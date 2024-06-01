import  { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// eslint-disable-next-line react/prop-types
function DropdownTipoMarca({ onChange }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, ] = useState(["Toyota", "Kia", "Honda", "Ford", "Chevrolet", "Hyundai"]);
  const [, setMarca] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setMarca(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="marca-label" style={{ color: "#f0f0f0" }}>Marca</InputLabel>
      <Select
        labelId="marca-label"
        id="marca"
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

export default DropdownTipoMarca;
