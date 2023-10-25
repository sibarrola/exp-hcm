/* ESTE ES EL FORMULARIO QUE VA PARA LA CARGA DE EXPEDIENTES */

import { useState, useRef, useEffect } from "react";

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
import { extractDigits } from "../../helpers/funcionesVarias.jsx";
import { PropTypes } from "prop-types";
/* import CustomDialog from '../componentes/CustomDialog.jsx'; */
/*  TRAIGO LA FUNCION-----------------------------------------*/
import useFetchCombos from '../../hooks/useFetchCombos.jsx';
import useAuth from "../../hooks/useAuth.jsx";
import CelularField from "./CelularField.jsx";
import DniField from "./DniField.jsx";
import CustomAlert from '../componentes/CustomAlert';
import ConfirmDialog from '../componentes/ConfirmDialog.jsx';
import useFetchAxios from "../../hooks/useFetchAxios.jsx";
let url = Global.url;
const ExpedientesCarga = ({ titulo, expedienteSeleccionado, estadoCarga,  setExpedienteSeleccionado,handleExpedienteSelected , isEditing, setIsEditing }) => {

    const [executeRequest, isSuccessful, setIsSuccessful, alert, setAlert,respuesta] = useFetchAxios();
    const [dialogOpen2, setDialogOpen2] = useState(false);
    const [isBorrando, setIsBorrando] = useState(false);
    const [borraExpediente, setBorraExpediente] = useState(null);


    let expedienteLimpio = {
        legajo: "",
        folios: "",
        estadoExp: "Estudio",
        motivo: "",
        nuevoMotivo: "",
        comentario: "",
        fechaIngreso: new Date().toISOString().substring(0, 10),
        categoria: "",
        institucion: "",
        organismo: "",
        nuevaInstitucion: "",
        dem: "",
        nuevoDem: "",
        nuevoOrganismo: "",
        solicitante: "",
        apellido: "",
        nombres: "",
        dni: "",
        celular: "",
        domicilio: "",
        estado: "true",

    };
 
   
    const [values, setValues] = useState(expedienteLimpio)
    const { auth } = useAuth();  // usuario logueado
 
    const [open, setOpen]=useState('false');
    const [errors, setErrors] = useState({});

    const {
        motivos,
        institucionesp,
        organismos,
        dems,
        categorias,
        addMotivo,
        addInstitucion,
        addOrganismo,
        addDem,
    } = useFetchCombos(url);

    const legajoRef = useRef(null);

    const apellidoRef = useRef(null);
    const nombresRef = useRef(null);

    const dniRef = useRef(null);
    /* limpia los campos del estado del formulario para comenzar a cargar otro expediente */
    const handleLimpio = () => {
        setValues(expedienteLimpio);
        console.log(values, "values");
    }

     useEffect(() => {
       
        console.log("use effect expedienteSeleccionado",expedienteSeleccionado);
        setValues(expedienteSeleccionado);
    }, [expedienteSeleccionado]);  


    useEffect(() => {
        if (isSuccessful) {
            console.log(respuesta);
            setValues(expedienteLimpio);
            if(estadoCarga != "Carga"){
                handleExpedienteSelected(respuesta)
            }
          
            setIsSuccessful(false);
        }
    }, [respuesta]);
  
    /*  esto es para desactivar la tecla ENTER */
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
        if (event.target.value=='Empleado del HCM'|| event.target.value=='Secretario del HCM'){
           
            setValues({
                ...values,
                solicitante: event.target.value,
            });
          }
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
    const handleDialogConfirm2 = async() => {
      
               
        let token = auth.token;
        let method;
        let url2;
        let expediente_guardar=expedienteSeleccionado;
            expediente_guardar.estado='false';

           method = "PUT"
            url2 = url + "/expedientes/"+values._id;;
            await executeRequest(url2, method, expediente_guardar, token);

      
        setBorraExpediente(null)
        handleDialogClose2();
    };

    const handleDialogClose2= () => {
        setDialogOpen2(false);
        setBorraExpediente(null)
    };
    /* borra el expedientes (solo un ADMINISTRADOR) */
  


    const guardarExpedienteEnBD = async () => {
        let solicitanteg = (!values.solicitante || values.solicitante.length == 0) ? (values.apellido + " " + values.nombres) : values.solicitante
       
        let motivog = (values.motivo && values.motivo == "Otro") ? values.nuevoMotivo : values.motivo;

        let dnig = extractDigits(values.dni);
        let celularg = (values.celular &&
            values.celular.length > 1) ? extractDigits(values.celular) : ""

        let legajog = parseInt(values.legajo);
        let foliosg = parseInt(values.folios);

       
        /* si el estadoCarga es Guardar lo guardo y si no lo actualizo */
        let token = auth.token;
        let method;
        let url2;
        let expediente_guardar;

        if (estadoCarga == "Carga") {
            method = "POST"
            url2 = url + "/expedientes";
              expediente_guardar = {
                
                legajo: legajog,
                folios: foliosg,
                estadoExp: 'Estudio',
                motivo: motivog,
                comentario: values.comentario,
                fechaIngreso: values.fechaIngreso,
                categoria: values.categoria,
                solicitante: solicitanteg,
                apellido: values.apellido,
                nombres: values.nombres,
                dni: dnig,
                celular: celularg,
                domicilio: values.domicilio,
                estado: "true",
                usuario: auth.uid,
                pases: [{
                    fecha_pase: values.fechaIngreso,
                    estacion: "Mesa de Entrada",
                    sub_estacion: "",
                    usuario_pase: auth.uid,
                    usuario_pase_nombre: auth.nombre,
                    comentario: ""
                }]
            }
        }
        else {
              expediente_guardar = {
                
                legajo: legajog,
                folios: foliosg,
                estadoExp: 'Estudio',
                motivo: motivog,
                comentario: values.comentario,
                fechaIngreso: values.fechaIngreso,
                categoria: values.categoria,
                solicitante: solicitanteg,
                apellido: values.apellido,
                nombres: values.nombres,
                dni: dnig,
                celular: celularg,
                domicilio: values.domicilio,
                estado: "true",
                usuario: auth.uid
                
            }

            url2 = url + "/expedientes/" + values._id;
            method = "PUT"
        }
        // llamo a la funcion executeRequest del useFetchAxios()------------ 
      
        await executeRequest(url2, method, expedienteSeleccionado, token);
     
    }
    /* SUBMIT DEL FORMULARIO ----------------------------------------------------------- */
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset errors
        setErrors({});
        /*  VALIDACIONES DE LOS CAMPOS Y SETEO DE LOS ERRORES ENCONTRADOS............ */
        if (!values.legajo || values.legajo.length < 1) {
            setErrors((errors) => ({ ...errors, legajo: "El campo legajo es requerido" }));
            legajoRef.current.focus();
            return
        }
        // ver si quiero validaar algo mas......................


        if (!values.apellido || values.apellido.length < 3) {
            setErrors((errors) => ({ ...errors, apellido: "El campo Apellido es requerido" }));
            apellidoRef.current.focus();
            return
        }
        if (!values.nombres || values.nombres.length < 3) {
            setErrors((errors) => ({ ...errors, nombres: "El campo Nombres es requerido" }));
            nombresRef.current.focus();
            return
        }


        /*=====================================================  */

        // Si no hay errores, enviar los datos
        if (Object.keys(errors).length <= 1) {

            if (values.motivo == "Otro" && values.nuevoMotivo.length > 0) {
                await addMotivo(values.nuevoMotivo);

            }


            /* ..este switch eliga la coleccion a la cual le va a agregar una nuevo campo................................................ */
            switch (values.categoria) {
                case 'D.E.M.':
                    //   values.solicitante = "D.E.M.";
                    if (values.dem === 'Otro') {
                        await addDem(values.nuevoDem);
                    }

                    break;
                case 'Instituciones privadas':
                    if (values.institucion === 'Otro') {
                        console.log(values.nuevaInstitucion, "values nueva institucion")
                        await addInstitucion(values.nuevaInstitucion);
                    }

                    break;
                case 'Organismo público':

                    if (values.organismo === 'Otro') {
                        console.log("nuevo oga", values.nuevoOrganismo);
                        await addOrganismo(values.nuevoOrganismo);

                    }
                break;
                default:
                    console.log("no es ninguna categoria para ampliar")
                /*  setValues({
                   ...values,
                   solicitante:values.apellido
                 }) */
            }
            await guardarExpedienteEnBD();



        }
        else {
            console.log("corrija!");
            console.log(Object.keys(errors))
        }

    };


    return (
        <Container component={Paper} sx={{ padding: 1, border: 1, borderColor: 'blue' }}>
            <form onSubmit={handleSubmit}>
            <ConfirmDialog
                            open={dialogOpen2}
                            onClose={handleDialogClose2}
                            title="Eliminación de la Repartición"
                            contentText={`¿Estás seguro de que deseas borrar ese expediente ?`}
                            onConfirm={handleDialogConfirm2}
                            titulo_fondo='#4dabf5'
                            titulo_color='black'
                            context_fondo='yellowlight'
                            context_color='secondary'
                        />
                     {open && (
            <CustomAlert 
                open={alert.open}
                onClose={() => setAlert({ ...alert, open: false })}
              /*   onClose={() => setOpen(false)} // opcional: para cerrar el me */
                message={alert.message}
            />
                
             
        )}
          
                <h3>{titulo}</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField

                            label="Fecha de Ingreso"
                            type="date"
                            name="fechaIngreso"
                            value={values.fechaIngreso}
                            onChange={handleChange}
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
                    <Grid item xs={12} sm={4} >
                        <TextField
                            required
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
                    <Grid item xs={12} sm={4} >
                        <TextField
                            required
                            label="Folios"
                            name="folios"
                            value={values.folios}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            /*  error={!!errors.folios}
                             helperText={errors.folios} */
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}  >
                        <FormControl fullWidth>

                            <InputLabel
                                shrink={true}
                                style={{ backgroundColor: '#ffff' }}  // <-- Estilo en línea para cambiar el color de fondo
                            >
                                Motivo</InputLabel>
                            <Select
                                required
                                name="motivo"
                                value={values.motivo}
                                onChange={handleMotivosChange}
                            /*  error={!!errors.motivo}
                             inputRef={motivoRef}
                             helperText={errors.motivo}*/

                            >

                                {motivos.map((motivo) => (
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
                                /* error={!!errors.nuevoMotivo}
                                helperText={errors.nuevoMotivo} */

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
                            /*   error={!!errors.comentario}
                              helperText={errors.comentario} */
                            /*  inputRef={comentarioRef} */
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
                                required
                                name="categoria"
                                value={values.categoria}
                                onChange={handleChange}
                            /*    error={!!errors.categoria}
                               inputRef={categoriaRef}
                               helperText={errors.categoria} */
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
                                    required={estadoCarga == "Carga" ? "required" : ""}
                                    name="organismo"
                                    value={values.organismo}
                                    onChange={handleOrganismoChange}
                                /*  error={!!errors.organismo}
                                helperText={errors.organismo}
                                inputRef={organismoRef}  */
                                >


                                    {organismos.map((organizacion, index) => (
                                        <MenuItem key={index} value={organizacion.organizacion}>
                                            {organizacion.organizacion}
                                        </MenuItem>
                                    ))}
                                    <MenuItem key="Otro" value="Otro">Otro</MenuItem>

                                </Select>
                                {errors.organismo && <p style={{ color: 'red' }}>{errors.organismo}</p>}
                            </FormControl>
                        </Grid>
                    )}
                    {
                        values.organismo === "Otro" && (
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Nuevo Organismo"
                                    name="nuevoOrganismo"
                                    value={values.nuevoOrganismo}
                                    onChange={handleOrganismoNuevo}
                                    onKeyDown={handleKeyDown}
                                    /*  error={!!errors.nuevoOrganismo}
                                     helperText={errors.nuevoOrganismo} */
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
                                    required={estadoCarga == "Carga" ? "required" : ""}
                                    name="institucion"
                                    value={values.institucion}
                                    onChange={handleInstitucionChange}
                                /*     error={!!errors.institucion} */
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
                                    required
                                    label="Nueva Institucion"
                                    name="nuevaInstitucion"
                                    value={values.nuevaInstitucion}
                                    onChange={handleInstitucionNueva}
                                    onKeyDown={handleKeyDown}

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
                                    required={estadoCarga == "Carga" ? "required" : ""}
                                    name="dem"
                                    value={values.dem}
                                    onChange={handleDemChange}
                                /* error={!!errors.dem} */
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
                                    required
                                    label="Nuevo D.E.M"
                                    name="nuevoDem"
                                    value={values.nuevoDem}
                                    onChange={handleDemNuevo}
                                    onKeyDown={handleKeyDown}
                                    /*  error={!!errors.nuevoDem}
                                     helperText={errors.nuevoDem} */
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
                            /*  error={!!errors.solicitante}
                             helperText={errors.solicitante} */
                            fullWidth
                        />
                    </Grid>
                    {/*    )
                  } */}
                    <Grid item xs={12}  >
                        <h5 >REPRESENTADO POR:</h5>
                    </Grid>

                    <Grid item xs={12} sm={6}  >

                        <TextField
                           required
                            label="Apellido"
                            name="apellido"
                            value={values.apellido}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!errors.apellido}
                            helperText={errors.apellido}
                            inputRef={apellidoRef}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>


                        <TextField
                            required
                            label="Nombres"
                            name="nombres"
                            value={values.nombres}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!errors.nombres}
                            helperText={errors.nombres}
                            inputRef={nombresRef}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        {/*   <DniField */}
                        <DniField
                            
                            label="DNI"
                            name="dni"
                            value={values.dni}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                         /*    inputRef={dniRef} */
                            /* error={!!errors.dni}
                            helperText={errors.dni}   */
                            fullWidth
                           
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CelularField

                            name="celular"
                            label="Celular (342-436 4723)"
                            value={values.celular}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}

                            /*   error={Boolean(errors.celular)}
                              helperText={!!errors.celular} */
                            fullWidth
                        /*    inputRef={celularRef} */
                        />
                    </Grid>
                    <Grid item xs={12}>


                        <TextField
                            label="domicilio"
                            name="domicilio"
                            value={values.domicilio}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            /*     error={!!errors.domicilio}
                                helperText={errors.domicilio} */
                            fullWidth
                        />
                    </Grid>

                    {/* ... falta poner el usuario que lo lee del req ... */}

                    <Grid item xs={12} marginTop="18px" marginRight='20px' alignContent="right">
                        {(estadoCarga == "Carga") ? (
                            <Button size="small" variant="contained" color="primary" type='submit' style={{ marginRight: 20 }}>Guardar</Button>) :
                            <Button size="small" variant="contained" color="primary" type='submit' style={{ marginRight: 20 }}>Actualizar</Button>


                        }

                        <Button size="small" variant="contained" color="botonCancela" onClick={handleLimpio} style={{ marginRight: 20 }}>Cancelar</Button>
                        <Button size="small" variant="contained" color="error" onClick={handleDialogConfirm2}>Borrar Exp</Button>

                    </Grid>
                </Grid>
            </form>

        </Container >
    );
};

export default ExpedientesCarga;



ExpedientesCarga.defaultProps = {
    titulo: "Carga de Expediente",
    expedienteSeleccionado: {},
    estadoCarga: "",
    isEditing: false
};


ExpedientesCarga.propTypes = {
    titulo:PropTypes.string,
    expedienteSeleccionado: PropTypes.object,
    estadoCarga:PropTypes.string,
    setExpedienteSeleccionado:PropTypes.func,
    handleExpedienteSelected:PropTypes.func,
    isEditing:PropTypes.bool,
    setIsEditing:PropTypes.func
}
 