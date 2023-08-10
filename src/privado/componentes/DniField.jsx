import InputMask from 'react-input-mask';
import { TextField }  from '@mui/material';



const DniField= (props)=> {
    return (
        <InputMask
          mask="99.999.999"
          value={props.value}
          onChange={props.onChange}
        >
          {(inputProps) => <TextField {...props} {...inputProps} />}
        </InputMask>
      );
    }
  
  export default DniField

  