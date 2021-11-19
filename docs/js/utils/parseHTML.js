'use strict';

function parseHTML(str) {
    let tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children[0];
}

export { parseHTML };

//Esta función sirve para, dada una cadena entre ``, crear un elemento HTML