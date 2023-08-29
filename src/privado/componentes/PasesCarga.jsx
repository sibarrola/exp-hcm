import React from 'react'

import {
    Select,
    MenuItem,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Container,
    Paper

} from '@mui/material';
import { Global } from '../../helpers/Global.jsx';
import { useState } from 'react';
  import useFetchCombos from '../../hooks/useFetchCombos.jsx'
/* import CustomAlert from '../../privado/componentes/CustomAlert'; */
import CustomDialog from '../../privado/componentes/CustomDialog';
import useAuth from "../../hooks/useAuth.jsx";
const url = Global.url;

/* ver de traer este estadao......... */


/* comienza el componente------------------------------------------- */
const PasesCarga = ({onAdd, expediente }) => {
    const { auth } = useAuth();  // usuario logueado
    const [estadoCarga,setEstadoCarga]=useState("Carga");
    console.log("estadoCarga",estadoCarga) 
    const {
        estaciones,
        comisiones,
        dems,
        organismos      
    } = useFetchCombos(url);
 
    const [formSubmitted, setFormSubmitted] = useState(false);

    let formData = {
        fecha_pase:   new Date().toISOString().substring(0, 10),
        estacion: "",
        sub_estacion:"",
        comision:"",
        organismo:"",
        dem:"",
        estado:"",
        usuario_pase: "",
        comentario: ""
    }
    const [formState, setFormState] = useState(formData);
    /* traigo del hookFormu-------------------------------------------------- */
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }
    const onInputChange2 = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
            sub_estacion:value
        });
    }

    const handleLimpio = () => {
        setFormState(formData);
        
    }
    /*  esto es para desactivar la tecla ENTER */
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    /* graba SUBMIT-------------------------------------------------- */
    const savePase = async (e) => {
        e.preventDefault();
/*         setFormSubmitted(true); */
           
        
  /*       if (!isFormValid) return; VERRRRRRRRRRRRRRRRRRR */
         console.log("formState",formState);
       let  paseg={
            fecha_pase:formState.fecha_pase,
            estacion:formState.estacion,
            sub_estacion:formState.sub_estacion,
            estado: "true",
            usuario_pase: auth.uid ,     
           comentario: formState.comentario
         }
      expediente.pases.push(paseg);    
      
 
 console.log(expediente.id);

 const request = await fetch(`${url}/expedientes/${expediente.id}`, {
    method: "PUT",
    body: JSON.stringify(expediente),
    headers: {
        "Content-Type": "application/json"
    }
});
     
  try{
    const data = await request.json();
     if (data.success=!"true" && data.errors){
        data.errors.map(error => alert(error.msg));
        return
     }
      setFormState(formData)   
     setFormSubmitted(false)  

  }
     catch(error) {
        console.log("error",error)
         return
     }
          
    }     
   
    return (
      
        <Container    component={Paper}  sx={{ padding: 2 ,border:1,borderColor:'blue'}}>                         
             <h3>Expediente nro Legajo {expediente.legajo}</h3>
             <h2>NUEVO PASE</h2>
            <form onSubmit={savePase}>
            <Grid container spacing={2}>
                    <Grid item xs={12}  >
                    <TextField
 
                            label="Fecha del Pase"
                            type="date"
                            name="fecha_pase"
                            value={formState.fecha_pase}
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            format="dd/MM/yyyy"
                            /* error={!!errors.fechaIngreso}
                            helperText={errors.fechaIngreso} */
                            fullWidth
                            InputLabelProps={{
                                shrink: true,  // <-- esta propiedad es necesaria para que el label no se superponga con la fecha predeterminada
                            }}
                        />
                    </Grid>

                  
                    <Grid item xs={12}  >
                        <FormControl fullWidth>
                            
                            <InputLabel
                                shrink={true}
                                style={{ backgroundColor: '#ffff' }}  // <-- Estilo en línea para cambiar el color de fondo
                            >
                                Estación</InputLabel>
                            <Select
                             required
                                name="estacion"
                                value={formState.estacion}
                                onChange={onInputChange}
                               /*  error={!!errors.motivo}
                                inputRef={motivoRef}
                                helperText={errors.motivo}*/
                                
                            > 
                            
                                {estaciones.map((estacion) => (
                                    <MenuItem key={estacion.estacion} value={estacion.estacion}>
                                        {estacion.estacion}
                                    </MenuItem>
                                ))}
                                <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                        </FormControl>
 </Grid>
                        {formState.estacion === "Comisión de Trabajo" && (
                        <Grid item xs={12}  >
                          <FormControl fullWidth>
                            
                            <InputLabel
                                shrink={true}
                                style={{ backgroundColor: '#ffff' }}  // <-- Estilo en línea para cambiar el color de fondo
                            >
                            Elija Comisión (sub-Estación)</InputLabel>
                            <Select
                             required
                             name="comision"
                             value={formState.comision}
                             onChange={onInputChange2}
                               /*  error={!!errors.motivo}
                                inputRef={motivoRef}
                                helperText={errors.motivo}*/
                              
                            > 
                            
                                {comisiones.map((comision) => (
                                    <MenuItem key={comision} value={comision}>
                                        {comision}
                                    </MenuItem>
                                ))}
                        
                            </Select>
                        </FormControl>
                        </Grid>
                    )}

{formState.estacion === "Externos-DEM" && (
                        <Grid item xs={12}  >
                          <FormControl fullWidth>
                            
                            <InputLabel
                                shrink={true}
                                style={{ backgroundColor: '#ffff' }}  // <-- Estilo en línea para cambiar el color de fondo
                            >
                            Elija D.E.M. (sub-Estación)</InputLabel>
                            <Select
                             required
                             name="dem"
                             value={formState.dem}
                                onChange={onInputChange2}
                               /*  error={!!errors.motivo}
                                inputRef={motivoRef}
                                helperText={errors.motivo}*/
                              
                            > 
                            
                                {dems.map((dem) => (
                                    <MenuItem key={dem.dem} value={dem.dem}>
                                        {dem.dem}
                                    </MenuItem>
                                ))}
                        
                            </Select>
                        </FormControl>
                        </Grid>
                    )}
             {formState.estacion === "Externos-Organismos" && (
                        <Grid item xs={12}  >
                          <FormControl fullWidth>
                            
                            <InputLabel
                                shrink={true}
                                style={{ backgroundColor: '#ffff' }}  // <-- Estilo en línea para cambiar el color de fondo
                            >
                            Elija Externos-Otros Organismos (sub-Estación)
                             </InputLabel>
                            <Select
                             required
                                name="organismo"
                                value={formState.organismo}
                                onChange={onInputChange2}
                               /*  error={!!errors.motivo}
                                inputRef={motivoRef}
                                helperText={errors.motivo}*/
                              
                            > 
                            
                                {organismos.map((organismo) => (
                                    <MenuItem key={organismo.organizacion} value={organismo.organizacion}>
                                        {organismo.organizacion}
                                    </MenuItem>
                                ))}
                        
                            </Select>
                        </FormControl>
                        </Grid>

                        /* ................. */
                    )}

 
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Comentario"
                            name="comentario"
                            value={formState.comentario}
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                          /*   error={!!errors.comentario}
                            helperText={errors.comentario} */
                           /*  inputRef={comentarioRef} */
                            fullWidth
                            multiline
                        />
                    </Grid>
                  
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={12} marginTop="20px" marginRight='20px' alignContent="right">
                        {(estadoCarga=="Carga")?(
                        <Button size="small" variant="contained" color="primary" type='submit' style={{ marginRight: 20 }}>Guardar</Button>):
                        <Button size="small" variant="contained" color="primary" type='submit' style={{ marginRight: 20 }}>Actualizar</Button>
                         

                        }

                        <Button size="small" variant="contained" color="secondary" onClick={handleLimpio}>Cancelar</Button>

                    </Grid>

                    </Grid>


                   
                    </form>
            
</Container>

       

       
    )
}




export default PasesCarga
