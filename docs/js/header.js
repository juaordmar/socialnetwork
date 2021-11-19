"use strict";

import { sessionManager } from "/js/utils/session.js";

function main(){
    showUser();
    addLogoutHandler();
    hideHeaderOptions();
}

function hideHeaderOptions() {
    let headerRegister = document.getElementById("navbar-register");
    let headerLogin = document.getElementById("navbar-login");
    let headerLogout = document.getElementById("navbar-logout");
    let headerRecent = document.getElementById("navbar-title"); //a lo mejor cambia después a navbar-recent
    let headerCreate = document.getElementById("navbar-create");
    let headerProfile = document.getElementById("navbar-profile");
    if (sessionManager.isLogged()) {
        headerRegister.style.display = "none";
        headerLogin.style.display = "none";
    } else {
        headerRecent.style.display = "none";
        headerCreate.style.display = "none";
        headerLogout.style.display = "none";
        headerProfile.style.display = "none";
    }
}

function showUser(){
    let title = document.getElementById("navbar-title");
    let text;
    if(sessionManager.isLogged()){
        let username = sessionManager.getLoggedUser().username;
        text = "Hi, @" + username;
    }else{
        text = "Anonymous";
    }
    title.textContent= text;
}

function addLogoutHandler () {
    let logoutButton = document.getElementById("navbar-logout");
    logoutButton.addEventListener("click", function() {
        sessionManager.logout () ;
        window.location.href = "index.html";
    }) ;
}
    

document.addEventListener("DOMContentLoaded", main);