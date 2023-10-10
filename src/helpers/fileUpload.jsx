 

export const fileUpload = async(file)=>{
    console.log(file,"desde fileUpload")
    if (!file)throw new Error('no tenemos ningún archivo a subir')
    
  const cloudUrl ='https://api.cloudinary.com/v1_1/hcm-rincon/raw/upload';
  const formData= new FormData();
  formData.append('upload_preset','expedientes');
  formData.append('file',file);
 /*  formData.append(' resource_type','raw'); */
 
  try {
    const resp=await fetch(cloudUrl,{
        method:'Post',
        body:formData,
    
    });
    console.log(resp);
    if (!resp.ok) throw new Error('no se pudo subir la imagen');
    const cloudResp =await resp.json();
    console.log(cloudResp);
    return cloudResp

  } catch (error){
    console.log(error);
     throw new Error(error.message);
  }
}