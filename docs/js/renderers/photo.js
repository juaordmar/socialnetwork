"use strict"

import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { ratingsAPI } from "/js/api/ratings.js";
import { messageRenderer } from "/js/renderers/messages.js";


const photoRenderer ={
    asCard : function(photo){ //cómo se muestran las fotos en la página principal
        let html = `<div class= "col-md-4">
        <div class= "card">
        <a href= "photo_detail.html?photoUserId=${photo.userId}&photoId=${photo.photoId}">
        <img src= "${photo.url}" class="card-img-top" >
        </a >
        <div class = "card-body">
        <h5 class= "card-title text-center" > ${photo.title} </h5 >
        <p class= "card-text"> ${ photo.description } </p>
        <p class= "card-text"> ${ photo.visibility } </p>
        <p class= "avgRating"></p>
        <p class= "text-right user-name" > ${photo.userId} </p >
        <p><a href="profile.html?userId=${photo.userId}" class="user"></a></p>
        </div >
        </div >
        </div >`
        let card = parseHTML(html);
        this.loadUserNameCard(card, photo.userId);
        this.loadAvgRating(card, photo.photoId);
        return card;
    },
    loadUserNameCard: function(card, userId){
        usersAPI.getById(userId)
            .then(users => {
                let username = users[0].username;
                let p = card.querySelector("p.user-name");
                p.textContent = "@" + username;
            });
    },loadAvgRating: function(card, photoId){
        let p = card.querySelector("p.avgRating");
        p.textContent = "0";
        ratingsAPI.getByPhotoId(photoId)
            .then(ratings => {
                let num = 0;
                let sum = 0;
                for (let rating of ratings){
                    if(rating.rating !== null){
                        sum = sum + rating.rating;
                        num += 1;
                    }
                }let avg = sum / num;
                let avgFixed = avg.toFixed();
                let p = card.querySelector("p.avgRating");
                p.textContent = avgFixed;    
            }).catch(error => messageRenderer.showErrorMessage(error));
    },
    loadMyRating: function(card, photoId){
        let p = card.querySelector("p.rating");
        p.textContent = "Rating: 0-5";
        ratingsAPI.getByPhotoId(photoId)
            .then(ratings => {
                let rating = ratings[0].rate;
                if(rating !== null){
                    p.textContent = `Rating: ${rating}/5`;
                }else{
                    p.textContent = `Not rated`;
                }
            })
            .catch(error => messageRenderer.showErrorMessage(error));
    },
    asDetails: function (photo) { //cómo se muestra la foto en la vista de detalles
        let html = `<div class= "photo-details">
                <h3> ${photo.title} </h3>
                <h6> ${photo.description} </h6>
                <p> Uploaded by <a href= "profile.html" class="user-link">
                User ${photo.userId} </a> on ${photo.date} </p>
                <hr>
                <img src="${photo.url}" class="img-fluid">
                </div> `;
        let photoDetail = parseHTML(html);
        this.loadUserNameCard(photoDetail, photo.userId);
        //this.loadMyRating(photoDetail, photo.photoId);
        return photoDetail;
    }
};

export {photoRenderer};