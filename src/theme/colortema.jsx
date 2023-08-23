
import {createTheme} from '@mui/material';
import {red} from '@mui/material/colors';
// PONER COLOR #aea9eb EN GOOGLE Y TRAE UN SELECTOR DE COLOR , QUE ESTA BUENO

/* defino aqui lo que quiera */
/* AGREGAR MAS SETEOS */
export const colortema =createTheme({
    palette:{
        primary:{
             /* main:'#483af0'   */
            /*  main: '#FF0000',    */ 
           /*  main:'#d6140d'   */
           /* main:'#2a3eb1'*/
          main:'#1c54b2'
        }, 
        secondary: {
           /*  main:'#aea9eb' */
         /*   main:'#d9b216'  */ 
           /* main: '#0d0487' */
         /*   main: '#0e13ab' */
      /*    main: '#b2102f'  // rojo mas oscuro*/
         main:red.A400
          },
        fondo:{
           /*  backgroundColor:"#eee6ff" */
              main:'#ef5350'
        },
        amarillo:{
            main:"#fcc032"
        },
        cabeceraTabla:{
            main:"#3e25fa"
        },
      
       error:{
        main:red.A400   /*red con la intensidad de 400  */
       }
}, components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "grabar"},
          style: {
            backgroundColor: '#0000FF', // Azul para los botones grabar
          },
        },
      ],
    },
   
    MuiDataGrid: {
        styleOverrides: {
            root: {
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold',
                },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor:'#E3F2FD',
              border: '2px solid #3e25fa', // Borde azul en la parte inferior de la fila de cabecera
            },
            // Otros estilos personalizados si los necesitas
          },
        },
      },
    } 
});


 