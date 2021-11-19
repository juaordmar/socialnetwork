"use strict";

const userValidator = {
    validateRegister: function (formData){
        let errors = [];
        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let pass = formData.get("password");
        let pass2 = formData.get("repeatPassword");
        let email = formData.get("email");
        let username = formData.get("username");

        let regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;

        if(firstName.length < 3 || lastName.length < 3){
            errors.push("The first and last name should have more than 3 characters");
        }

        else if(email.length == 0){
            errors.push("An email direction is required");
        }

        else if(username.length < 3){
            errors.push("A username should have more than 3 characters");
        }

        else if(pass.length < 7){
            errors.push("Password length must be 7 or more");
        }

        else if(! regex.test(pass)){
            errors.push("Password must contain a number, a lower case and a capital letter")
        }

        else if(pass !== pass2){
            errors.push("The passwords must match");
        }
        return errors;
    }
};

export {userValidator};