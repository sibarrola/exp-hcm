import { useState } from 'react';
import axios from 'axios';
/* A ESTE LO ARMÉ PARA QUE MUESTRE BIEN LOS ERRORES...................  */
const useFetchAxios = () => {
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [respuesta, setRespuesta] = useState({});
    const executeRequest = async (url, method, data, token = "") => {
        let response
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-token": token
                }
            };

            switch (method) {
                case "POST":
                    response = await axios.post(url, data, config);
                    break;

                   case "PUT":
                    response = await axios.put(url, data, config);
                    break;

                    case "DELETE":
                    response = await axios.delete(url, config);
                    break;

            }

            if (response.data.success) {
                // Aquí  la respuesta exitosa
                setAlert({
                    open: true,
                    severity: 'success',  // Cambiado a 'success'
                    message: `El expediente nro legajo: ${response.data.expediente.legajo} ha sido procesado OK!`
                });
                setIsSuccessful(true);
                setRespuesta(response.data.expediente)
            } else {
                // Aquí manejas errores del backend
                let errores = response.data.errors.errors.map(error => error.msg).join(" ");
                setAlert({
                    open: true,
                    severity: 'error',
                    message: errores
                });
            }
        } catch (error) {
            // Aquí manejas errores de la petición
            console.log("error respnse", error.response)
            let mens = (error.response.status === '401') ? error.data.msg : error.message;
            setAlert({
                open: true,
                severity: 'error',
                message: `ERROR! ${mens}`
            });
        }
    }

    return [executeRequest, isSuccessful, setIsSuccessful, alert, setAlert, respuesta];
}

export default useFetchAxios;