/* import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

const CelularField = (props) => {
  // Extraer las propiedades que quieres pasar a TextField
  const { value, name,onChange,onKeyDown,helperText , inputRef,error, ...otherProps } = props;

  return (
    <InputMask   mask="+54 \9 999-999-9999" value={value} onChange={onChange}>
      {(inputProps) => (
        <TextField
          value={value}
          onChange={onChange}
          helperText={helperText}
          error={error}
          {...inputProps}
          {...otherProps} // Pasa las demás propiedades a TextField
        />
      )}
    </InputMask>
  );
};

export default CelularField; */
import InputMask from 'react-input-mask';
import { TextField }  from '@mui/material';



const CelularField= (props)=> {
    return (
        <InputMask
          mask="999-999-9999"
          value={props.value}
          onChange={props.onChange}
        
        >
          {(inputProps) => <TextField {...props} {...inputProps} />}
        </InputMask>
      );
    }
  
  export default CelularField


  