 
 import InputMask from 'react-input-mask';
import { TextField }  from '@mui/material'


const DniField= (props)=> {
 
    return (
        <InputMask
          mask="99.999.999"
          value={props.value}
          onChange={props.onChange}
          inputRef={dniRef}
        >
          {(inputProps) => <TextField {...props} {...inputProps} />}
        </InputMask>
      );
    }
  
  export default DniField  

 /*  const DniField = ({ value, onChange, ...props }) => {
    const  handleDniChange = (e) => {
      let newValue = e.target.value.replace(/\D/g, ""); // Elimina cualquier caracter no numérico
      if (newValue.length > 2) newValue = [newValue.slice(0, 2), '.', newValue.slice(2)].join('');
      if (newValue.length > 6) newValue = [newValue.slice(0, 6), '.', newValue.slice(6)].join('');
      onChange({ ...e, target: { ...e.target, value: newValue } });
    };
  
    return (
        <TextField
          {...props}
          value={value}
          onChange={handleDniChange}
          fullWidth
        />
    );
  };
  export default DniField  */