/* ESTE ES EL FORMULARIO QUE VA PARA LA CARGA DE EXPEDIENTES */
import React, { useEffect, useState, useRef  } from "react";
import {
    Select,
    MenuItem,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Container,
    Paper,
    Typography
} from '@mui/material';
import { Global } from '../../helpers/Global.jsx';
import axios from 'axios';
import { number } from "yup";
/*  TRAIGO LA FUNCION-----------------------------------------*/
import  useFetchCombos  from '../../hooks/useFetchCombos.jsx';  

  

const ExpedientesCarga = () => {

    let url = Global.url;
    
   const {
    motivos,
    institucionesp,
    organismos,
    dems,
    addMotivo,
    addInstitucion,
    addOrganismo,
    addDem,
  } = useFetchCombos(url);
 
  const legajoRef = useRef(null);
  const motivoRef = useRef(null);
  const categoriaRef = useRef(null);
   /*  const [motivos, setMotivos] = useState([]);
    const [institucionesp, setInstitucionesp] = useState([]);
    const [organismos, setOrganismos] = useState([]);
    const [dems, setDems] = useState([]);
 */
    // estados para agregar un nuevo elemento a las tablas que alimentan a los combos de organismos,instituciones y dem
   /*  const [nuevoOrganismo, setNuevoOrganismo] = useState("")
    const [nuevaInstitucion, setNuevaInstitucion] = useState("");
    const [nuevoDem, setNuevoDem] = useState("");   */

    /* para la edicion, tendria que poner algo así: */
    /*  const expedienteLimpio ={
        legajo:2,
fechaIngreso:"2023-08-10T00:00:00.000+00:00".substring(0,10),
motivo:"Resolucion conflictos",
comentario:"",
categoria:"Particular",
solicitante:"Lores  Fabian Aurelio",
apellido:"Lores ",
nombres:"Fabian Aurelio",
celular:"",
domicilio:"",
dni:"11456788",
folios:1,
estado:true,
usuario:"64c14460d96b8b9cdb37eef5",
nuevoMotivo:"",
nuevaInstitucion:"",
nuevoOrganismo:"",
nuevoDem:""

     } */

    /* tengo que capturar el usuario.......... */ 
  const expedienteLimpio={
        legajo: "",
        folios:"",
        motivo: "",
        nuevoMotivo:"",
        comentario: "",
        fechaIngreso: new Date().toISOString().substr(0, 10),
        categoria: "",
        institucion: "",
        organismo: "",
        nuevaInstitucion: "",
        dem:"",
        nuevoDem: "",
        nuevoOrganismo: "",
        solicitante: "",
        apellido:"",
        nombres:"",
        dni:"",
        celular:"",
        domicilio:"",
        estado:"true",
        usuario:"64c14460d96b8b9cdb37eef5"
    }  

    const [values, setValues] = useState(expedienteLimpio);
    const [errors, setErrors] = useState({});

    /* C A T E G O R I A S -------------------------------------------------------O */
    const categorias = ['Particular', 'D.E.M.', 'Concejal', 'Organismo público', 'Instituciones privadas', 'Otro'];



    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      };
  

  /*  cuando se van cargando los campos................ */
    const handleChange = (event) => {
           setValues({
            ...values,
            [event.target.name]: event.target.value,
        
        });
    }
    /*  cuando elije una institucion de la lista */
    const handleInstitucionChange = (event) => {
    const selectedInstitucion = event.target.value;

        setValues({
            ...values,
            solicitante: selectedInstitucion.institucion,
            institucion: selectedInstitucion,
        });
    };
    /*  cuando agrega una nueva institucion, actualiza tambien el campo solicitante en el estado del formulario (values) */
    const handleInstitucionNueva = (event) => {
    const selectedInstitucionNueva = event.target.value;
        setValues({
            ...values,
            solicitante: selectedInstitucionNueva,
            nuevaInstitucion: selectedInstitucionNueva
        });
    };

        /*  cuando elije un organismo de la lista */
    const handleOrganismoChange = (event) => {
    const selectedOrganismo = event.target.value;  
        setValues({
            ...values,
            solicitante: selectedOrganismo,
            organismo: selectedOrganismo,
        });
    };
     /*  cuando agrega un  nuevo organizmo, actualiza tambien el campo solicitante en el estado del formulario (values) */
    const handleOrganismoNuevo = (event) => {
    const selectedOrganismoNuevo = event.target.value;   
        setValues({
            ...values,
            solicitante: selectedOrganismoNuevo,
            nuevoOrganismo: selectedOrganismoNuevo
        });
    };

    const handleDemChange = (event) => {
    const selectedDem = event.target.value;
    console.log("selectedDem",selectedDem);
        setValues({
            ...values,
            solicitante: selectedDem,
            dem: selectedDem,
        });
    };
    const handleDemNuevo = (event) => {
        const selectedDemNuevo = event.target.value;
        setValues({
            ...values,
            solicitante: selectedDemNuevo,
            nuevoDem: selectedDemNuevo
        });
    };
 /*  cuando elije un motivo*/
 const handleMotivosChange = (event) => {
    const selectedMotivo = event.target.value;

        setValues({
            ...values,
             motivo: selectedMotivo,
        });
    };
    

    /* limpia los campos del estado del formulario para comenzar a cargar otro expediente */
    const handleLimpio = () => {
           setValues( expedienteLimpio);
    }

  
    const guardarExpedienteEnBD = async () => {   
       let solicitanteg=(values.solicitante.length==0)?(values.apellido+" "+values.nombres):values.solicitante
             
        let motivog=(values.motivo=="Otro")?values.nuevoMotivo:values.motivo;
/* ojo, traer el usuario............................. */
        let expediente_guardar={
            legajo: values.legajo,
            folios:values.folios,
            motivo: motivog,
            comentario: values.comentario,
            fechaIngreso: values.fechaIngreso,
            categoria: values.categoria,
            solicitante: solicitanteg,
            apellido:values.apellido,
            nombres:values.nombres,
            dni:values.dni,
            celular:values.celular,
            domicilio:values.domicilio,
            estado:"true",
            usuario:"64c14460d96b8b9cdb37eef5"

        }
        
        axios.post(`${url}/expedientes`, expediente_guardar)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })

    }
/* SUBMIT DEL FORMULARIO ----------------------------------------------------------- */
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset errors
        setErrors({});
      /*  VALIDACIONES DE LOS CAMPOS Y SETEO DE LOS ERRORES ENCONTRADOS */
        if (!values.legajo) {
            setErrors((errors) => ({ ...errors, legajo: "El campo legajo es requerido" }));
            legajoRef.current.focus();
            return
        }
        

        if (!values.motivo) {
            setErrors((errors) => ({ ...errors, motivo: "El campo motivo es requerido" }));
            motivoRef.current.focus();
            return
        }
        if (!values.categoria) {
            setErrors((errors) => ({ ...errors, categoriaRef: "El campo categoria es requerido" }));
            categoriaRef.current.focus();
            return
        } 

        // Si no hay errores, enviar los datos
        if (Object.keys(errors).length === 0) {

          if(values.motivo=="Otro" &&  values.nuevoMotivo.length>0) {
                await addMotivo(values.nuevoMotivo);
              
          }


        console.log(values.categoria,"(categoria)")
            /* ..este switch eliga la coleccion a la cual le va a agregar una nuevo campo................................................ */
            switch (values.categoria) {
                case 'D.E.M.':
                    //   values.solicitante = "D.E.M.";
                    if (values.dem === 'Otro') {
                      await  addDem(values.nuevoDem);
                     }

                    break;
                case 'Instituciones privadas':
                    if (values.institucion === 'Otro') {
                        console.log(values.nuevaInstitucion,"values nueva institucion")
                     await  addInstitucion(values.nuevaInstitucion);
                       }

                    break;
                case 'Organismo público':
             
                    if (values.organismo=== 'Otro') {
                        console.log("nuevo oga",values.nuevoOrganismo);
                 await addOrganismo(values.nuevoOrganismo);  
               
                    }

                    break;
                default:
                    console.log("no es ninguna categoria")
                     /*  setValues({
                        ...values,
                        solicitante:values.apellido
                      }) */
            }
             guardarExpedienteEnBD();
               console.log('Expediente guardado:');
               handleLimpio();
            // Limpia el formulario después de guardar el expediente.
            
           
        }
        else
        {
            alert("corrija!")
        }

    };


    return (
        <Container component={Paper} maxWidth="lg" sx={{ padding: 2 }}>
            <form onSubmit={handleSubmit}>
                <h3>CARGA DE EXPEDIENTES</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Fecha de Ingreso"
                            type="date"
                            name="fechaIngreso"
                            value={values.fechaIngreso}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!errors.fechaIngreso}
                            helperText={errors.fechaIngreso}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,  // <-- esta propiedad es necesaria para que el label no se superponga con la fecha predeterminada
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}  sm={4} >
                        <TextField
                            label="Legajo"
                            type="number"
                            name="legajo"
                            value={values.legajo}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!errors.legajo}
                            helperText={errors.legajo}
                            fullWidth
                            inputRef={legajoRef} 
                        />
                    </Grid>
                    <Grid item xs={12}  sm={4} >
                        <TextField
                         
                            label="Folios"
                            name="folios"
                            value={values.folios}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!errors.folios}
                            helperText={errors.folios}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}  >
                        <FormControl fullWidth>
                            <InputLabel
                                shrink={true}
                                style={{ backgroundColor: '#fff' }}  // <-- Estilo en línea para cambiar el color de fondo
                            >
                                Motivo</InputLabel>
                            <Select
                                name="motivo"
                                value={values.motivo}
                                onChange={handleMotivosChange}
                                error={!!errors.motivo}
                                inputRef={motivoRef} 
                            >
                                {motivos.map((motivo, index) => (
                                    <MenuItem key={motivo.motivo} value={motivo.motivo}>
                                        {motivo.motivo}
                                    </MenuItem>
                                ))}
                                  <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                        </FormControl>
                        {errors.motivo && <p style={{ color: 'red' }}>{errors.motivo}</p>}
                    </Grid>
                    {values.motivo === "Otro" && (
                        <Grid item xs={12}>
                            <TextField
                                label="Nuevo Motivo"
                                name="nuevoMotivo"
                                value={values.nuevoMotivo}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                error={!!errors.nuevoMotivo}
                                helperText={errors.nuevoMotivo}
                                fullWidth
                            />
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <TextField
                            label="Comentario"
                            name="comentario"
                            value={values.comentario}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!errors.comentario}
                            helperText={errors.comentario}
                            fullWidth
                            multiline
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel
                                shrink={true}
                                style={{ backgroundColor: '#fff' }}  // <-- Estilo en línea para cambiar el color de fondo
                            >
                                Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={values.categoria}
                                onChange={handleChange}
                                error={!!errors.categoria}
                                inputRef={categoriaRef} 
                            >
                                {categorias.map((categoria, index) => (
                                    <MenuItem key={index} value={categoria}>
                                        {categoria}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.categoria && <p style={{ color: 'red' }}>{errors.categoria}</p>}
                        </FormControl>
                    </Grid>
                    {values.categoria === 'Organismo público' && (
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    shrink={true}
                                    style={{ backgroundColor: '#fff' }}  // <-- Estilo en línea para cambiar el color de fondo
                                >
                                    Organismo</InputLabel>
                                <Select
                                    name="organismo"
                                    value={values.organismo}
                                    onChange={handleOrganismoChange}
                                    error={!!errors.organismo}
                                >
                                    {organismos.map((organizacion, index) => (
                                        <MenuItem key={index} value={organizacion.organizacion}>
                                            {organizacion.organizacion}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="Otro">Otro</MenuItem>

                                </Select>
                                {errors.organismo && <p style={{ color: 'red' }}>{errors.organismo}</p>}
                            </FormControl>
                        </Grid>
                    )}
                    {
                        values.organismo === "Otro" && (
                            <Grid item xs={12}>
                                <TextField
                                    label="Nuevo Organismo"
                                    name="nuevoOrganismo"
                                    value={values.nuevoOrganismo}
                                    onChange={handleOrganismoNuevo}
                                    onKeyDown={handleKeyDown}
                                    error={!!errors.nuevoOrganismo}
                                    helperText={errors.nuevoOrganismo}
                                    fullWidth
                                />
                            </Grid>
                        )}
                    {values.categoria === 'Instituciones privadas' && (
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    shrink={true}
                                    style={{ backgroundColor: '#fff' }}  // <-- Estilo en línea para cambiar el color de fondo
                                >
                                    Institución</InputLabel>
                                <Select
                                    name="institucion"
                                    value={values.institucion}
                                    onChange={handleInstitucionChange}
                                    error={!!errors.institucion}
                                >
                                    {institucionesp.map((institucion, index) => (
                                        <MenuItem key={index} value={institucion}>
                                            {institucion.institucion}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Select>
                                {errors.institucion && <p style={{ color: 'red' }}>{errors.institucion}</p>}
                            </FormControl>
                        </Grid>
                    )
                    }

                    {
                        values.institucion === "Otro" && (
                            <Grid item xs={12}>
                                <TextField
                                    label="Nueva Institucion"
                                    name="nuevaInstitucion"
                                    value={values.nuevaInstitucion}
                                    onChange={handleInstitucionNueva}
                                    onKeyDown={handleKeyDown}
                                    error={!!errors.nuevaInstitucion}
                                    helperText={errors.nuevaInstitucion}
                                    fullWidth
                                />
                            </Grid>
                        )}

                    {values.categoria === 'D.E.M.' && (
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    shrink={true}
                                    style={{ backgroundColor: '#fff' }}  // <-- Estilo en línea para cambiar el color de fondo
                                >
                                    Dep.DEM</InputLabel>
                                <Select
                                    name="dem"
                                    value={values.dem}
                                    onChange={handleDemChange}
                                    error={!!errors.dem}
                                >
                                    {dems.map((dem, index) => (
                                        <MenuItem key={index} value={dem.dem}>
                                            {dem.dem}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Select>
                                {errors.dem && <p style={{ color: 'red' }}>{errors.dem}</p>}
                            </FormControl>
                        </Grid>
                    )}
                    {
                        values.dem === "Otro" && (
                            <Grid item xs={12}>
                                <TextField
                                    label="Nuevo D.E.M"
                                    name="nuevoDem"
                                    value={values.nuevoDem}
                                    onChange={handleDemNuevo}
                                    onKeyDown={handleKeyDown}
                                    error={!!errors.nuevoDem}
                                    helperText={errors.nuevoDem}
                                    fullWidth
                                />
                            </Grid>
                        )}

{/* {values.categoria != 'Particular' && values.categoria != 'Concejal' && ( */}
                    <Grid item xs={12}>
                        <TextField
                            label="Solicitante"
                            name="solicitante"
                            value={values.solicitante}
                             onChange={handleChange} 
                             onKeyDown={handleKeyDown}
                            error={!!errors.solicitante}
                            helperText={errors.solicitante}
                            fullWidth
                        />
                    </Grid>
               {/*    )
                  } */}
                    <Grid item xs={12}>
                    <h4 sx={{with:"100%"}}>REPRESENTADO POR:</h4>
                    </Grid>
                 
                     <Grid item xs={12} sm={6}>
                          
                        <TextField
                            label="Apellido"
                            name="apellido"
                            value={values.apellido}
                             onChange={handleChange} 
                             onKeyDown={handleKeyDown}
                            error={!!errors.apellido}
                            helperText={errors.apellido}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                   
                          
                          <TextField
                              label="Nombres"
                              name="nombres"
                              value={values.nombres}
                               onChange={handleChange} 
                               onKeyDown={handleKeyDown}
                              error={!!errors.nombres}
                              helperText={errors.nombres}
                              fullWidth
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                       
                    <TextField
                            label="DNI"
                            name="dni"
                            value={values.dni}
                             onChange={handleChange} 
                             onKeyDown={handleKeyDown}
                            error={!!errors.dni}
                            helperText={errors.dni}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                          
                       
                    <TextField
                            label="Celular"
                            name="celular"
                            value={values.celular}
                             onChange={handleChange} 
                             onKeyDown={handleKeyDown}
                            error={!!errors.celular}
                            helperText={errors.celular}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                          
                       
                          <TextField
                                  label="domicilio"
                                  name="domicilio"
                                  value={values.domicilio}
                                   onChange={handleChange} 
                                   onKeyDown={handleKeyDown}
                                  error={!!errors.domicilio}
                                  helperText={errors.domicilio}
                                  fullWidth
                              />
                          </Grid>

                    {/* ... falta poner el usuario que lo lee del req ... */}
                </Grid>
                <Grid item xs={12} marginTop="20px" marginRight='20px' alignContent="right">
                    <Button size="small" variant="contained" color="primary" type='submit' style={{ marginRight: 20 }}>Guardar</Button>
                    <Button size="small" variant="contained" color="secondary" onClick={handleLimpio}>Cancelar</Button>

                </Grid>
               
            </form>
        </Container>
    );
};

export default ExpedientesCarga;
