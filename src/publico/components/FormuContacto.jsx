import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
 
import useFormu from  '../../hooks/useFormu'
import { Global } from '../../helpers/Global.jsx'
import { useState } from 'react';
import Email from '@mui/icons-material/Email';


const formValidations ={
    correo:[(value)=>value.includes('@'), 'el correo debe de tener una @'],
    
    nombre:[(value)=>value.length>=1,'El nombre es obligatorio'],
    consulta:[(value)=>value.length>=0,'debe ingresar una consulta'],
}

/* comienza el componente------------------------------------------- */
const FormuContacto = () => {

const url = Global.url;  
const [formSubmitted,setFormSubmitted]=useState(false);

    let formData = {
        nombre: "",
        correo: "",
        consulta: "",
        
    }
    /* traigo del hookFormu-------------------------------------------------- */
    const { formState,setFormState, onInputChange,isFormValid ,nombreValid,correoValid,consultaValid } = useFormu(formData,formValidations);
     

 /* graba SUBMIT-------------------------------------------------- */
    const saveUser = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        let newUser = formState;
        newUser.rol="INVITADO";
        
        setFormSubmitted(true);

        if ( !isFormValid ) return;

        const request = await fetch(`${url}/usuarios`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        }) ;

        const data=await request.json();
    
        if (data.errors) {
            data.errors.map(error => alert(error.msg));
            return
        }
        /* si pudo grabar  muestro el mensaje que me trae y limpio estado formulario */
        alert(data.msg)
        setFormState(formData)
        setFormSubmitted(false)
    } 
    return (
        < >
       {/*   <p>  {isFormValid ? "Válido": "Incorrecto"}</p>   */}
            <form onSubmit={saveUser}>
                <Grid container sx={{width:'70%'}}>
                <Typography sx={{ml:'100px' }}  variant="h5">CONTACTO</Typography>
              
                <Typography variant='h6' sx={{color:'blue',fontStyle:'italic',width:'500px', display:'block', mb:'40px',mt:'60px'}}  >Escriba su consulta:</Typography>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            name="nombre"
                            type="text"
                            placeholder='Nombre completo'
                            onChange={onInputChange}
                            error={!!nombreValid && formSubmitted}
                            helperText={nombreValid}
                            value={formState.nombre}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            name="correo"
                            type="email"
                            placeholder='correo@google.com'
                            onChange={onInputChange}
                            error={!!correoValid && formSubmitted}
                            helperText={correoValid}
                            value={formState.correo}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Consulta"
                            name="consulta"
                            type="text"
                            placeholder='Ingrese su consulta'
                            onChange={onInputChange}
                            error={!!consultaValid && formSubmitted}
                            helperText={consultaValid}
                            value={formState.consulta}
                            fullWidth
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Button type="submit"
                             variant='contained' 
                             fullWidth
                             startIcon={<Email />} >
                                Enviar Mail
                            </Button>
                        </Grid>
                    </Grid>


                   

                </Grid>


            </form>

        </>
    )
}

export default FormuContacto
