
export const fileUpload = async( file ) => {

    if( !file ) throw new Error('no tenemos ningun archivo a subir');
    const cloudURL = 'https://api.cloudinary.com/v1_1/moralduke-cloud/upload';

    const formData = new FormData();

    formData.append('upload_preset', 'journal-react');
    formData.append('file', file);

    try {
        
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('no se pudo subir imagen');

        const cloudResponse = await resp.json();

        return cloudResponse.secure_url
;
    } catch (error) {
        console.log(error); 
        throw new Error(error.message);
    }
}