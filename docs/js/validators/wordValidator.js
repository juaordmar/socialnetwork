"use strict";

const wordValidator={
    
    validateWords: function(text){
        let errors=0;
        let palabras=["belloto",
             "berzotas",
             "besugo",
             "bobalicón",
             "bocabuzón",
             "bocachancla",
             "bocallanta",
             "boquimuelle",
             "borrico",
             "botarate",
             "brasas"];
        for(let palabra of palabras){
            if(text.toLowerCase().includes(palabra.toLowerCase())){
                errors += 1;
            }
        }
        return errors;
    }
};

export{ wordValidator };