import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
 
import useFormu from  '../../hooks/useFormu'
import { Global } from '../../helpers/Global.jsx'
import { useState } from 'react';
import Email from '@mui/icons-material/Email';
import axios from 'axios';
 import CustomAlert from '../../privado/componentes/CustomAlert';

const formValidations ={
    email:[(value)=>value.includes('@'), 'el correo debe de tener una @'],
    
    nombre:[(value)=>value.length>=1,'El nombre es obligatorio'],
    message:[(value)=>value.length>=0,'debe ingresar una consulta'],
    subject:[(value)=>value.length>=0,'debe ingresar un asunto']
}

/* comienza el componente------------------------------------------- */
const FormuContacto = () => {
    const [avisoOpen, setAvisoOpen] = useState(false);
    const [mensaje,setMensaje] = useState("");
  
   
   
const url = Global.url;  
const [formSubmitted,setFormSubmitted]=useState(false);

    let formData = {
        nombre: "",
        email: "",
        subject:"",
        message: "",
        
    }
    /* traigo del hookFormu-------------------------------------------------- */
    const { formState,setFormState, onInputChange,isFormValid ,nombreValid,emailValid,messageValid,subjectValid } = useFormu(formData,formValidations);
    const handleAvisoClose= () => {
        setAvisoOpen(false);
        setMensaje("");
    };

 /* graba SUBMIT-------------------------------------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        

        if ( !isFormValid ) return;
        try {
            const response = await axios.post(`${url}/send-email`, formState);
            if (response.status === 200) {
               /*  alert('Correo enviado exitosamente'); */
               setAvisoOpen(true);
               setMensaje('Correo enviado existosamente!')
            }
        } catch (error) {
            alert('Error al enviar el correo');
        }

        
        setFormState(formData)
        setFormSubmitted(false)
    } 
    return (
        < >
       {/*   <p>  {isFormValid ? "Válido": "Incorrecto"}</p>   */}
            <form onSubmit={handleSubmit}>
                <Grid container sx={{width:'70%'}}>
                <CustomAlert
                            open={avisoOpen}
                            onClose={handleAvisoClose}
                            severity="warning"
                            message=  {mensaje}
                          
                        />
                <Typography sx={{ml:'100px' }}  variant="h5">CONTACTO</Typography>
              
                <Typography variant='h6' sx={{color:'blue',fontStyle:'italic',width:'500px', display:'block', mb:'40px',mt:'60px'}}  >Escriba su consulta:</Typography>
                    <Grid item xs={12} sx={{ mt: 1 }}>
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
                            name="email"
                            type="email"
                            placeholder='correo@google.com'
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                            value={formState.email}
                            fullWidth
                            autoComplete='email'
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Asunto"
                            name="subject"
                            type="text"
                            placeholder='Ingrese su consulta'
                            onChange={onInputChange}
                            error={!!subjectValid && formSubmitted}
                            helperText={subjectValid}
                            value={formState.subject}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Consulta"
                            name="message"
                            type="text"
                            multiline 
                            rows={5}
                            placeholder='Ingrese su consulta'
                            onChange={onInputChange}
                            error={!!messageValid && formSubmitted}
                            helperText={messageValid}
                            value={formState.message}
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
