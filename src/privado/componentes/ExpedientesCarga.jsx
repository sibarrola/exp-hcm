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
    Paper
} from '@mui/material';
import { Global } from '../../helpers/Global.jsx';
import axios from 'axios';

const url = Global.url;

const ExpedientesCarga = () => {
    const [motivos, setMotivos] = useState([]);
    const [instituciones, setInstituciones] = useState([]);
    const [organismos, setOrganismos] = useState([]);
    const [dems, setDems] = useState([]);

    // estados para agregar un nuevo elemento a las tablas que alimentan a los combos de organismos,instituciones y dem
    const [nuevoOrganismo, setNuevoOrganismo] = useState("")
    const [nuevaInstitucion, setNuevaInstitucion] = useState("");
    const [nuevoDem, setNuevoDem] = useState("");
    
    const [values, setValues] = useState({
        legajo: "",
        motivo: "",
        comentario: "",
        fechaIngreso: new Date().toISOString().substr(0, 10),
        categoria: "",
        solicitante: "",
        

    });
    const [errors, setErrors] = useState({});

    /* C A T E G O R I A S -------------------------------------------------------O */
    const categorias = ['Particular', 'D.E.M', 'Concejal', 'Organismo público', 'Instituciones privadas', 'Otro'];


    /* busca la lista de motivos */
    const fetchMotivos = async () => {
        const resMotivos = await axios.get(`${url}/motivos`);
        setMotivos(resMotivos.data.motivos);
    };
    /* busca la lista de motivos */
    const fetchInstituciones = async () => {
        const resInstituciones = await axios.get(`${url}/instituciones`);
        setInstituciones(resInstituciones.data.instituciones);
    };
    /* busca la lista de ORGANISMOS */
    const fetchOrganismo = async () => {
        const resOrganismo = await axios.get(`${url}/organizaciones`);
        setOrganismos(resOrganismo.data.Organismoes);
    };

    /* busca la lista de departamentos DEM */
    const fetchDem = async () => {
        const resDems = await axios.get(`${url}/dems`);
        setDems(resDems.data.dems);
    };

    useEffect(() => {
        fetchMotivos();
        fetchInstituciones();
        fetchOrganismo();
        fetchDem()
    }, []);

    /* // guarda el valor del ingreso nueva institucion */
    const handleOtraInstitucionChange = (event) => {
        const otraInstitucionInput = event.target.value;
        setNuevaInstitucion(otraInstitucionInput);
        setValues({
            ...values,
            [solicitante]:otraInstitucionInput
        })
      };
     /* // guarda el valor del ingreso nueva institucion */
      const handleOtroOrganismoChange = (event) => {
        const newOrganismoInput = event.target.value;
        setNuevoOrganismo(newOrganismoInput);
        setValues({
            ...values,
            [solicitante]:newOrganismoInput
        })
      };
    
      const handleOtroDemChange = (event) => {
        const newDemInput = event.target.value;
        setNuevoDem(newDemInput);
        setValues({
            ...values,
            [setDems]:newDemInput
        })
      };

      // cambia el estado de cualquier cambio de expedientes
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });

    };
    const handleLimpio = (event) => {
        event.preventDefault();
        setValues([]);
    }

    const guardarNuevaInstitucionEnBD = async (nuevaInstitucion) => {
        try {
          // Realiza una petición al servidor para guardar la nueva institución en la base de datos
       
          await axios.post('/api/instituciones', { institucion:nuevaInstitucion });
          console.log('Nueva institución guardada en la base de datos.');
        } catch (error) {
          console.error('Error al guardar la nueva institución:', error);
        }
      };
      const guardarNuevaOrganizacionEnBD = async (nuevoOrganismo) => {
        try {
          // Realiza una petición al servidor para guardar la nueva institución en la base de datos
       
          await axios.post('/api/organizaciones', { organizacion:nuevoOrganismo });
          console.log('Nueva institución guardada en la base de datos.');
        } catch (error) {
          console.error('Error al guardar el nuevo organismo pub.:', error);
        }
      };
      const guardarNuevoDemEnBD = async (nuevoDem) => {
        try {
          // Realiza una petición al servidor para guardar la nueva institución en la base de datos
       
          await axios.post('/api/dems', { nuevoDem });
          console.log('Nuevo DEm guardada en la base de datos.');
        } catch (error) {
          console.error('Error al guardar el DEM:', error);
        }
      };

      const guardarExpedienteEnBD  =async()=>{
        axios.post(`${url}/expedientes`, values)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
 

      }
      

    const handleSubmit = async(event) => {
        event.preventDefault();

        // Reset errors
        setErrors({});

        // Validaciones
        if (!values.legajo) {
            setErrors((errors) => ({ ...errors, legajo: "El campo legajo es requerido" }));
        }

        if (!values.motivo) {
            setErrors((errors) => ({ ...errors, motivo: "El campo motivo es requerido" }));
        }

        // Si no hay errores, enviar los datos
        if (Object.keys(errors).length === 0) {

            switch (values.categoria) {
                case 'D.E.M.':
                    values.solicitante = "D.E.M.";
                    if (values.dem === 'Otro') {
                        await guardarNuevoDemEnBD(nuevoDem);
                        
                      }
                      
                    break;
                case 'Instituciones privadas':
                    if (values.institucion === 'Otro') {
                        await guardarNuevaInstitucionEnBD(nuevaInstitucion);
                    /*     values.solicitante=nuevaInstitucion */
                      }
                      
                     
                    break;
                case 'Organismo público':
                    if (values.organizacion === 'Otro') {
                        await guardarNuevaOrganizacionEnBD(nuevoOrganismo);
                       /*  values.solicitante=nuevoOrganismo */
                      }
                     
                    break;
                default:
                    values.solicitante = "Privado"
            }

             // Si se seleccionó "Otra" en el campo de institución, guardamos la nueva institución en la base de datos.
    
 
 

   
             guardarExpedienteEnBD();
      // Luego, aquí puedes realizar las acciones necesarias para guardar el expediente, utilizando la institución seleccionada.
      console.log('Expediente guardado:');
  
      // Limpia el formulario después de guardar el expediente.
    
      setInstituciones('');
  
      setDems([]);
      setOrganismos([]);
      setNuevoOrganismo("");
      setNuevoDem("");
      setNuevaInstitucion(''); 
      
            
        }
    };

    return (
        <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
            <form onSubmit={handleSubmit}>
                <h3>CARGA DE EXPEDIENTES</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} >
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
                                value={nuevoMotivo}
                                onChange={handleNuevoMotivoChange}
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
                    {values.categoria === 'Organismo' && (
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
                                    onChange={handleChange}
                                    error={!!errors.organismo}
                                >
                                    {organismos.map((organizacion, index) => (
                                        <MenuItem key={index} value={organizacion.organizacion}>
                                            {organizacion.organizacion}
                                        </MenuItem>
                                    ))}
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
                                    value={nuevoOrganismo}
                                    onChange={handleOtroOrganismoChange}
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
                                    onChange={handleChange}
                                    error={!!errors.institucion}
                                >
                                    {instituciones.map((institucion, index) => (
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
                                    value={nuevaInstitucion}
                                    onChange={handleOtraInstitucionChange}
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
                                    onChange={handleChange}
                                    error={!!errors.dem}
                                >
                                    {dems.map((dem, index) => (
                                        <MenuItem key={index} value={dems.dem}>
                                            {dems.dem}
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
                                    value={nuevoDem}
                                    onChange={handleOtroDemChange}
                                    error={!!errors.nuevoDem}
                                    helperText={errors.nuevoDem}
                                    fullWidth
                                />
                            </Grid>
                        )}





                    {/* ... otros campos ... */}
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
