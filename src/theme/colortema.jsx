
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
             /*  main:'#1c54b2'  */  
          /* main:'#795548'  */   /* marron */
           main:'#002984' 
       /*     main:'#aa2e25' rojo */
        }, 
        secondary: {
           /*  main:'#aea9eb' */
         /*   main:'#d9b216'  */ 
           /* main: '#0d0487' */
         /*   main: '#0e13ab' */
      /*    main: '#b2102f'  // rojo mas oscuro*/
           main:red.A400 
        /*   main:"#795548" */ /* marron mas claro */

          },
        fondo:{
           /*  backgroundColor:"#eee6ff" */
               main:'#ef5350'  
           /*   main:'#80d8ff', */
        },
        amarillo:{
            main:"#fcc032",
            secondary:"#f7f7ed"
        },
        cabeceraTabla:{
            main:"#3e25fa"
        },
        cabeceraDialog:{
            main:'#648dae'
        },
        botonConfirma:{
            main:"#2196f3",
            secondary:"#f7f7ed"
        },
        botonCancela:{
            main:'#90caf9'
           
        },
       
        botonBorra:{
            main:'#e57373'
           
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
            '& .MuiDataGrid-row:hover': {
                backgroundColor: '#E3F2FD', // Color de fondo al pasar el cursor sobre la fila
            },
            '& .MuiDataGrid-row:focus': {
                backgroundColor: '#e0e0e0', // Color de fondo al enfocar la fila
            },
          },
        },
      },

    } ,
    
    typography: {
        texto: {
          fontSize: '14px', // Tamaño de fuente por defecto
          '@media (max-width:900px)': {
            fontSize: '12px', // Ajustar el tamaño de fuente para pantallas pequeñas y medias
          },
        },
        texto1: {
            fontSize: '22px', // Tamaño de fuente por defecto
            '@media (max-width:99px)': {
              fontSize: '12px', // Ajustar el tamaño de fuente para pantallas pequeñas y medias
            },
          },
      },
     /*  '@global': {
        // Por defecto (dispositivos pequeños)
        body: {
          fontSize: '12px',
        },
        // Para pantallas medianas
        [`@media (min-width:${960}px)`]: { // Equivalent to theme.breakpoints.up('md')
          body: {
            fontSize: '14px',
          },
        },
        // Para pantallas grandes
        [`@media (min-width:${1280}px)`]: { // Equivalent to theme.breakpoints.up('lg')
          body: {
            fontSize: '16px',
          },
        },
      },
    });
      */
    overrides: {
        MuiCssBaseline: {
          '@global': {
            body: {
              fontSize: '12px',
              '@media (min-width:960px)': {
                fontSize: '14px',
              },
              '@media (min-width:1280px)': {
                fontSize: '16px',
              },
            },
          },
        },
      },
    });