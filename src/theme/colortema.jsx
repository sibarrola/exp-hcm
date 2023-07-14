
import {createTheme} from '@mui/material';
import {red} from '@mui/material/colors';
// PONER COLOR #aea9eb EN GOOGLE Y TRAE UN SELECTOR DE COLOR , QUE ESTA BUENO

/* defino aqui lo que quiera */
export const colortema =createTheme({
    palette:{
        primary:{
            main:'#483af0'
        },
        secondary: {
            main:'#aea9eb'
    },
       error:{
        main:red.A400   /*red con la intensidad de 400  */
       }
}
})