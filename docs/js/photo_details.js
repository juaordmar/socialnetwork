"use strict"

import { photoRenderer } from "/js/renderers/photo.js" ;
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js"
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let userId = urlParams.get("photoUserId");

function main(){
    
    let photoContainer = document.querySelector("#photo-details-column");
    photosAPI.getById(userId,photoId)
        .then(photos => {
            let photoDetails = photoRenderer.asDetails(photos[0]);
            photoContainer.appendChild(photoDetails);
            let rateForm = document.getElementById("rate-form");
            let actions_col = document.getElementById("actions-column");
            if(sessionManager.isLogged()){
                actions_col.style.display = "none";
                if(sessionManager.getLoggedUser().userId===photos[0].userId){
                    actions_col.style.display = "inline";
                }
            }else{
                actions_col.style.display = "none";
                rateForm.style.display = "none";
            }
        })
        .catch(error => {
            messageRenderer.showErrorMessage(error)
        });
    
    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete; 

    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit; 

    let rateForm = document.getElementById("rate-form");
    rateForm.onsubmit = handleRate;

}

function handleRate(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    formData.append("userId", sessionManager.getLoggedUser().userId);
    formData.append("photoId", photoId);
    
    let rating = document.getElementById("rating-input");
    
    if(rating==="1"){
        formData.append("rating", "1");
    }else if(rating==="2"){
        formData.append("rating", "2");
    }else if(rating==="3"){
        formData.append("rating", "3");
    }else if(rating==="4"){
        formData.append("rating", "4");
    }else if(rating==="5"){
        formData.append("rating", "5");
    }

    ratingsAPI.create(formData)
        .then(data => window.location.href = `photo_detail.html?photoUserId=${userId}&photoId=${photoId}`)
        .catch(error => {
            ratingsAPI.update(sessionManager.getLoggedUser().userId, photoId, formData)
                .then(data => window.location.href = `photo_detail.html?photoUserId=${userId}&photoId=${photoId}`)
                .catch(error => messageRenderer.showErrorMessage(error));
        });
}

function handleEdit(event){
    window.location.href = "edit_photo.html?photoUserId=" + userId + "&&photoId=" + photoId;
}

function handleDelete(event){
    let answer = confirm("Do you really want to delete this photo?");
    if (answer) {
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

document.addEventListener("DOMContentLoaded", main);
