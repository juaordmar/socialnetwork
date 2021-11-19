"use strict"
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { photoRenderer } from "/js/renderers/photo.js" ;
import { sessionManager } from "/js/utils/session.js" ;

const galleryRenderer ={
    asCardGallery: function (photos){
        let galleryContainer = parseHTML ( '<div class = "photo-gallery"> </div>');
        let row = parseHTML ( '<div class = "row"> </div >') ;
        galleryContainer.appendChild(row) ;

        let counter = 0;

        for(let photo of photos){
            if(sessionManager.isLogged()){
//el usuario logeado puede ver sus propias fotos (públicas y privadas)
//y puede ver el resto de fotos públicas
                if(sessionManager.getLoggedUser().userId===photo.userId
                || photo.visibility==="Public"){
                    let card = photoRenderer.asCard(photo);
                    row.appendChild(card);
                    counter += 1;
                    if (counter % 3 === 0) {
                        row = parseHTML('<div class= "row"> </div >');
                        galleryContainer.appendChild(row);
                    }
                }
            }else{
//el usuario no logeado solo puede ver las fotos públicas
                if(photo.visibility==="Public"){
                    let card = photoRenderer.asCard(photo);
                    row.appendChild(card);
                    counter += 1;
                    if (counter % 3 === 0) {
                        row = parseHTML('<div class= "row"> </div >');
                        galleryContainer.appendChild(row);
                    }
                }
            }    
        }
        return galleryContainer;
    }
};

export {galleryRenderer};