import InputMask from 'react-input-mask';
import { TextField }  from '@mui/material';



const CelularField= (props)=> {
    return (
        <InputMask
          mask="+54 \9 999-999-9999"
          value={props.value}
          onChange={props.onChange}
        >
          {(inputProps) => <TextField {...props} {...inputProps} />}
        </InputMask>
      );
    }
  
  export default CelularField

  