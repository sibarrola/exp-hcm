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
    const [values, setValues] = useState({
        legajo: "",
        motivo: "",
        nuevoMotivo: "",
        comentario: "",
        fechaIngreso: new Date().toISOString().substr(0, 10),
        // ... otros campos ...
    });
    const [errors, setErrors] = useState({});
    const categorias = ['Particular', 'D.E.M', 'Concejal', 'Organismo', 'InstitucionesPriv', 'Otro'];
    const organismos = ['Organismo 1', 'Organismo 2', 'Organismo 3'];
    const instituciones = ['Institución 1', 'Institución 2', 'Institución 3'];
    useEffect(() => {
        const fetchMotivos = async () => {
            const resMotivos = await axios.get(`${url}/motivos`);

            setMotivos(resMotivos.data.motivos);
        };

        fetchMotivos();
    }, []);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
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
            //  axios.post("/ruta/a/tu/api/expedientes", values);

            console.log("values", values)
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
                                InputLabelProps={{
                                    shrink: true,  //  
                                }}
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
                    {values.motivo === "otros" && (
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
                                    {organismos.map((organismo, index) => (
                                        <MenuItem key={index} value={organismo}>
                                            {organismo}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.organismo && <p style={{ color: 'red' }}>{errors.organismo}</p>}
                            </FormControl>
                        </Grid>
                    )}
                    {values.categoria === 'InstitucionesPriv' && (
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
                                            {institucion}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.institucion && <p style={{ color: 'red' }}>{errors.institucion}</p>}
                            </FormControl>
                        </Grid>
                    )}






                    {/* ... otros campos ... */}
                </Grid>
                <Button type="submit">Enviar</Button>
            </form>
        </Container>
    );
};

export default ExpedientesCarga;
