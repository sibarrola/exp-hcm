import { useState } from 'react';
import axios from 'axios';
/* A ESTE LO ARMÉ PARA QUE MUESTRE BIEN LOS ERRORES...................  */
const useFetchAxios = () => {
    const [alert, setAlert]   = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const [isSuccessful, setIsSuccessful] = useState(false);

    const executeRequest = async (url, method, data, token = "") => {
        try {
            let response;
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    "x-token":token
                }
            };

            switch(method) {
                case "POST":
                    response = await axios.post(url, data, config);
                    break;
                case "PUT":
                    response = await axios.put(url, data, config);
                    break;
                
            }

            if (response.data.success) {
                
               
                // Aquí manejas la respuesta exitosa
                setAlert({
                    open: true,
                    severity: 'success',  // Cambiado a 'success'
                    message: `El expediente nro legajo: ${response.data.expediente.legajo} ha sido procesado OK!`
                });
                setIsSuccessful(true);
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
            let mens = (error.response && error.response.status === '401') ? "no está autorizado" : error.message;
            setAlert({
                open: true,
                severity: 'error',
                message: `ERROR! ${mens}`
            });
        }
    }
   console.log("hook antes de retornar",isSuccessful)
    return [executeRequest, isSuccessful, alert, setAlert];
}

export default useFetchAxios;