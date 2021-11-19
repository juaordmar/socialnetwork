"use strict";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let userId = urlParams.get("photoUserId");
let currentPhoto = null;


function main() {

    if ( photoId !== null ) {
        loadCurrentPhoto () ;
    }

    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;
}

function loadCurrentPhoto() {
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");
    pageTitle.textContent = "Editing a photo";
    photosAPI.getById(userId, photoId)
        .then(photos => {
            currentPhoto = photos[0];
            urlInput.value = currentPhoto.url;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            visibilityInput.value = currentPhoto.visibility;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}
    
function handleSubmitPhoto(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let visibility = document.getElementById("input-visibility");
    if(visibility==="Public"){
        formData.append("visibility", "Public");
    }else{
        formData.append("visibility", "Private");
    }

    if (currentPhoto === null){
        // Add the current user ID
        formData.append("userId", sessionManager.getLoggedId());
        photosAPI.create(formData)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    } else {
        formData.append("userId", currentPhoto.userId);
        formData.append("date", currentPhoto.date);
        photosAPI.update(photoId, formData)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

document.addEventListener("DOMContentLoaded", main);