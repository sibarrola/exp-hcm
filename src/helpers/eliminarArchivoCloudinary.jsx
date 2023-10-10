import axios from 'axios';

export const eliminarArchivoCloudinary=async (publicId,url) =>{

    let url2= url+'/eliminarArchivo' ;
    console.log("publicId",publicId);
    /* const nombreArr=publicId.split('/');
    const nombre=nombreArr[nombreArr.length-1];
    console.log(nombreArr);
    const [publicoId]=nombre.split('.');
    console.log("publicoId",publicoId);*/

    let data={"publicId":publicId} ;
    
  let response = await axios.post(url2,data);
  console.log(response);
  return response;

 /*  const cloudName = 'hcm-rincon'; // Reemplaza con tu nombre de nube de Cloudinary
  const apiKey = '625533511418625'; // Reemplaza con tu clave API de Cloudinary
  const apiSecret = 'D9g4KnmJpsw93DNs6njQ71fgyuQ'; // Reemplaza con tu secreto API de Cloudinary

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload/${publicId}?api_key=${apiKey}&api_secret=${apiSecret}`;

  try {
    const response = await axios.delete(url);

    if (response.status === 200) {
      console.log('Archivo eliminado con éxito');
    } else {
      console.error('Error al eliminar el archivo:', response.data);
    }
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
  }*/
} 

 
