"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js" ;
import { messageRenderer } from "/js/renderers/messages.js" ;
import { photosAPI } from "/js/api/photos.js";

function main(){
    let content=document.querySelector("div.container");
    photosAPI.getAll()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            content.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main)