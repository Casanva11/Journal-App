import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name:'casanva',
    api_key:'958573667191241',
    api_secret:'4XioiCSNJ9czBj7r9RRhCrTbDmc',
    secure: true
});

describe('Pruebas en fileUpload', () => { 
    
    test('debe de subir el archivo correctamente a cloudinary ', async() => { 
        
        const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature-825x465.jpg';
        const resp = await fetch( imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url =  await fileUpload(file);
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imgId =  segments[ segments.length -1 ].replace('.jpg','');
        // console.log(imgId);
        
        const cloudResp=await cloudinary.api.delete_resources([ 'journal/'+ imgId ], {
            resource_type: 'image'
        });
        // console.log({cloudResp});
        
     })

     test('debe de retornar null', async() => { 
    
        const file = new File([], 'foto.jpg');
        const url =  await fileUpload(file);
        expect( url ).toBe(undefined);

      })

 })