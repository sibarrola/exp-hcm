/* ESTE ES EL FORMULARIO QUE VA PARA LA CARGA DE EXPEDIENTES */
import React, { useEffect, useState } from "react";
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

const url = Global.url;

const ExpedientesCarga = () => {
    const [motivos, setMotivos] = useState([]);
    const [institucionesp, setInstitucionesp] = useState([]);
    const [organismos, setOrganismos] = useState([]);
    const [dems, setDems] = useState([]);

    // estados para agregar un nuevo elemento a las tablas que alimentan a los combos de organismos,instituciones y dem
    const [nuevoOrganismo, setNuevoOrganismo] = useState("")
    const [nuevaInstitucion, setNuevaInstitucion] = useState("");
    const [nuevoDem, setNuevoDem] = useState("");

     const expedienteLimpio={
        legajo: "",
        folios:"",
        motivo: "",
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

/* TODAS LAS TABLAS DE LOS COMBOS-------------------------  */
    /* busca la lista de motivos */
    const fetchMotivos = async () => {
        const resMotivos = await axios.get(`${url}/motivos`);
        setMotivos(resMotivos.data.motivos);
    };
    /* busca instituciones */
    const fetchInstituciones = async () => {
        const resInstituciones = await axios.get(`${url}/instituciones`);
        setInstitucionesp(resInstituciones.data.instituciones);
    };
    /* busca la lista de ORGANISMOS */
    const fetchOrganismo = async () => {
        const resOrganismo = await axios.get(`${url}/organizaciones`);
        setOrganismos(resOrganismo.data.organizaciones);
    };

    /* busca la lista de departamentos DEM */
    const fetchDem = async () => {
        const resDems = await axios.get(`${url}/dems`);
        setDems(resDems.data.dems);
    };
/*  CUANDO SE CARGA EL COMPONENTE CARGA LAS TABLAS Y LAS GUARDA EN LOS ESTADOS */
    useEffect(() => {
        fetchMotivos();
        fetchInstituciones();
        fetchOrganismo();
        fetchDem()
    }, []);


    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value

        });
    }
    /*  cuando cambia la institucion */
    const handleInstitucionChange = (event) => {
    const selectedInstitucion = event.target.value;

        setValues({
            ...values,
            solicitante: selectedInstitucion.institucion,
            institucion: selectedInstitucion,
        });
    };

    const handleInstitucionNueva = (event) => {
        const selectedInstitucionNueva = event.target.value;
        setValues({
            ...values,
            solicitante: selectedInstitucionNueva,
            nuevaInstitucion: selectedInstitucionNueva
        });
    };
    const handleOrganismoChange = (event) => {
        const selectedOrganismo = event.target.value;
        setValues({
            ...values,
            solicitante: selectedOrganismo.organismo,
            organismo: selectedOrganismo,
        });
    };
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
    const handleLimpio = () => {
           setValues( expedienteLimpio);
    }

    const guardarNuevaInstitucionEnBD = async (nuevaInstitucion) => {
        try {
      
            await axios.post(`${url}/instituciones`, { institucion: values.nuevaInstitucion });
            console.log('Nueva institución guardada en la base de datos.');
            console.log(institucionesp);
        } catch (error) {
            console.error('Error al guardar la nueva institución:', error);
        }
    };
    const guardarNuevaOrganizacionEnBD = async (nuevoOrganismo) => {
        try {
           await axios.post(`${url}/organizaciones`, { organizacion: nuevoOrganismo });

            console.log('Nueva orga guardada en la base de datos.');
        } catch (error) {
            console.error('Error al guardar el nuevo organismo pub.:', error);
        }
    };
    const guardarNuevoDemEnBD = async (nuevoDem) => {
        try {
            console.log('Nuevo DEm  .',nuevoDem);
            await axios.post(`${url}/dems`, { dem:nuevoDem });
            console.log('Nuevo DEm guardada en la base de datos.',nuevoDem);
        } catch (error) {
            console.error('Error al guardar el DEM:', error);
        }
    };

    const guardarExpedienteEnBD = async () => {
        if(values.solicitante==""){
            setValues({
                ...values,
                solicitante:values.apellido
            })
        }
        axios.post(`${url}/expedientes`, values)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset errors
        setErrors({});
        // Validaciones
        if (!values.legajo) {
            setErrors((errors) => ({ ...errors, legajo: "El campo legajo es requerido" }));
        }
        if (!typeof (legajo) == number) {
            setErrors((errors) => ({ ...errors, legajo: "El campo legajo debe ser un numero" }));
        }

        if (!values.motivo) {
            setErrors((errors) => ({ ...errors, motivo: "El campo motivo es requerido" }));
        }

        // Si no hay errores, enviar los datos
        if (Object.keys(errors).length === 0) {
        
            /* ...............................................................si es DEM O Una institucion o una organizacion y agregó un nuevo elemento a la lista................................................. */
            switch (values.categoria) {
                case 'D.E.M.':
                    //   values.solicitante = "D.E.M.";
                    if (values.dem === 'Otro') {
                        setNuevoDem(values.nuevoDem);
                        console.log(values);
                        await guardarNuevoDemEnBD(nuevoDem);
                        await fetchDem(); /* la leo de nuevo a la lista , ahora modificada. No pude cambiar el estado  */
                    }

                    break;
                case 'Instituciones privadas':
                    if (values.institucion === 'Otro') {
                       
                        setNuevaInstitucion(values.nuevaInstitucion);

                         await guardarNuevaInstitucionEnBD(nuevaInstitucion);
                         await fetchInstituciones();  /* la leo de nuevo a la lista , ahora modificada. No pude cambiar el estado  */
                      
                    }

                    break;
                case 'Organismo público':
                    if (values.organizacion === 'Otro') {
                        setNuevoOrganismo(values.nuevoOrganismo);
                        await guardarNuevaOrganizacionEnBD(nuevoOrganismo);
                        await fetchOrganismo();
                        /* la leo de nuevo a la lista , ahora modificada. No pude cambiar el estado  */
                    }

                    break;
                default:
                      setValues({
                        ...values,
                        solicitante:values.apellido
                      })
            }
            guardarExpedienteEnBD();
               console.log('Expediente guardado:');

            // Limpia el formulario después de guardar el expediente.
            
            handleLimpio();
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
                            name="legajo"
                            value={values.legajo}
                            onChange={handleChange}
                            error={!!errors.legajo}
                            helperText={errors.legajo}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}  sm={4} >
                        <TextField
                            label="Folios"
                            name="folios"
                            value={values.folios}
                            onChange={handleChange}
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
                                onChange={handleChange}
                                error={!!errors.motivo}

                            >
                                {motivos.map((motivo, index) => (
                                    <MenuItem key={motivo.motivo} value={motivo.motivo}>
                                        {motivo.motivo}
                                    </MenuItem>
                                ))}
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
