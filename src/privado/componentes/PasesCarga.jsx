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
import { useState, useEffect } from 'react';
import useFetchCombos from '../../hooks/useFetchCombos.jsx'

import CustomDialog from '../../privado/componentes/CustomDialog';
import useAuth from "../../hooks/useAuth.jsx";
const url = Global.url;
import { PropTypes } from "prop-types";
 
/* ver de traer este estadao......... */

/* comienza el componente------------------------------------------------ */
/* const PasesCarga = ({ expediente, handleExpedienteSelect, setSeleccionado, pase,setPase, onPaseAdd, editingPase, setEditingPase, handlePaseEdit, onPaseDelete,estadoCarga,setEstadoCarga }) => { */
const PasesCarga = ({ expediente, paseAEditar,modo,setModo,onGuardar,handlePaseEdit,handleLimpio }) => {


    const [nuevoPase, setNuevoPase] = useState(paseAEditar);
    let idexp = expediente._id;
    const today = new Date().toISOString().split('T')[0]; //esta va a ser la fecha máxima que me permitirá seleccionar (para que no carguen un pase hacia adelante)

    /* Si quisiera dar parmiso por 2 días hacia adelante: */
    /*  const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);
      const maxDate = currentDate.toISOString().split('T')[0];
    */

    const { auth } = useAuth();  // usuario logueado


    const {
        estaciones,
        comisiones,
        dems,
        organismos
    } = useFetchCombos(url);


    let formData = {
        fecha_pase: new Date().toISOString().substring(0, 10),
        estacion: "",
        sub_estacion: "",
        comision: "",
        organismo: "",
        dem: "",
        estado: "",
        usuario_pase: "",
        comentario: ""
    }



    useEffect(() => {
        if (modo=="Editar") {

            switch (paseAEditar.estacion) {
                case 'Externos-DEM':
                    paseAEditar.dem = paseAEditar.sub_estacion;
                    break;
                case 'Externos-Organismos':
                    paseAEditar.organismo = paseAEditar.sub_estacion;
                    break;
                case "Comisión de Trabajo":
                    paseAEditar.comision = paseAEditar.sub_estacion;
                    break;
                default:
            }
            paseAEditar.usuario_pase_nombre = auth.nombre; // actualizo con el nombre del que edita
            setNuevoPase(paseAEditar);
           
        }
         
    }, [paseAEditar]) ;
     //cuando cambia el pase
    /* useEffect(() => {
        if(isSuccessful){
          
            handleExpedienteSelect(respuesta);
            setEditingPase(false)  
            setEstadoCarga("NUEVO PASE");
            console.log("tuvo exito el put",isSuccessful);
            console.log("exped",expediente)
          
         } 
     }, [isSuccessful]); */
 /*     useEffect(() => {
     
            console.log("response",respuesta)
            handleExpedienteSelect(respuesta);
            setEditingPase(false)  
            setEstadoCarga("NUEVO PASE");
            setNuevoPase(formData);  
           
      
     }, [respuesta]); */
   
    /* traigo del hookFormu-------------------------------------------------- */
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setNuevoPase({
            ...nuevoPase,
            [name]: value
        });
    }
    const onInputChange2 = ({ target }) => {
        const { name, value } = target;
        setNuevoPase({
            ...nuevoPase,
            [name]: value,
            sub_estacion: value
        });

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
        let expedienteNuevo;
        if (modo=="Editar") {

            // si edito voy a la función que trae los pases, busca el editado y lo reemplaza
            expedienteNuevo= handlePaseEdit(nuevoPase)

        } else {
            let paseg = {
                fecha_pase: nuevoPase.fecha_pase,
                estacion: nuevoPase.estacion,
                sub_estacion: nuevoPase.sub_estacion,
                estado: "true",
                usuario_pase: auth.uid,
                usuario_pase_nombre: auth.nombre,
                comentario: nuevoPase.comentario}
            
            expedienteNuevo = { ...expediente, pases: [...expediente.pases, paseg] };
              //agrego en el campo de expedientes un nuevo pase al final del vector
           
            }
          console.log("eXPEDIENTE NUEVO",expedienteNuevo)

         await onGuardar(expedienteNuevo);
         setNuevoPase(formData);
      
         setModo("Cargar");
      
    }

    return (

        <Container component={Paper} sx={{ padding: 2, border: 1, borderColor: 'blue' }}>

            <h3>{modo}</h3>
            <h4>Exp. Legajo {expediente.legajo} {JSON.stringify(paseAEditar)} </h4>
            <form onSubmit={savePase}>
               
            <CustomDialog
                    open={alert.open}
                    onClose={() => setAlert({ ...alert, open: false })}
                    severity={alert.severity}
                    message={alert.message}
                    title="Aviso de ingreso" />
                <Grid container spacing={2}>
                    <Grid item xs={12}  >
                        <TextField
                            label="Fecha del Pase"
                            type="date"
                            name="fecha_pase"
                            value={nuevoPase.fecha_pase}
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            format="dd/MM/yyyy"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,  // <-- esta propiedad es necesaria para que el label no se superponga con la fecha predeterminada
                            }}
                            inputProps={{
                                max: today  // <-- Establece la fecha actual como valor máximo
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
                                value={nuevoPase.estacion}
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
                    {nuevoPase.estacion === "Comisión de Trabajo" && (
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
                                    value={nuevoPase.comision}
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

                    {nuevoPase.estacion === "Externos-DEM" && (
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
                                    value={nuevoPase.dem}
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
                    {nuevoPase.estacion === "Externos-Organismos" && (
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
                                    value={nuevoPase.organismo}
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
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                        label="Comentario"
                        name="comentario"
                        value={nuevoPase.comentario}
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
                        {(modo == "Cargar") ? (
                            <Button size="small" variant="contained" color="primary" type='submit' style={{ marginRight: 20 }}>Guardar</Button>) :
                            <Button size="small" variant="contained" color="primary" type='submit' style={{ marginRight: 20 }}>Actualizar</Button>


                        }

                        <Button size="small" variant="contained" color="botonCancela" onClick={handleLimpio}>Salir</Button>

                    </Grid>

                </Grid>



            </form>

        </Container>




    )
}
export default PasesCarga;
PasesCarga.propTypes = {

    expediente: PropTypes.object,
    handleExpedienteSelect: PropTypes.func,
    setSeleccionado: PropTypes.func,
    pase: PropTypes.object,
setPase:PropTypes.func,
    onPaseAdd: PropTypes.func,
    editingPase: PropTypes.bool,
    setEditedPase: PropTypes.func,
    handlePaseEdit: PropTypes.func,
    onPaseDelete: PropTypes.func,
};