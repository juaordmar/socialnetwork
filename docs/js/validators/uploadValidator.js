"use strict";

import { sessionManager } from "../utils/session.JS";
import { wordValidator } from "/js/validators/wordValidator.js ";

const uploadValidator = {
    validateUpload: function ( formData ) {
        let errors = [];
        let title = formData.get("title");
        let description = formData.get("description");
        
        if(!sessionManager.isLogged()){
            errors.push("You must be logged to upload a photo");
        }

        let invalidTitle = wordValidator.validateWords(title);
        let invalidDescription = wordValidator.validateWords(description);

        if(invalidTitle > 0 || invalidDescription > 0){
            errors.push("Try another title or description");
        }
        if (title.length < 3){
            errors.push("Title is too short");
        }
        return errors;
    },
};

export {uploadValidator};
