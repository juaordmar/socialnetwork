"use_strict";

import {BASE_URL, requestOptions} from "./common.js";
    
    const ratingsAPI = {
        getByPhotoId: function(photoId){
            return new Promise (
                function (resolve, reject){
                    axios.get(`${BASE_URL}/ratings/${photoId}`,requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
                }
            );
        },

        create: function (formData) {
            return new Promise(
                function (resolve, reject) {
                    axios.post(`${BASE_URL}/ratings`, formData, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
                }
            );
        },

        update: function (userId, photoId, formData) {
            return new Promise(
                function (resolve, reject) {
                    axios.put(`${BASE_URL}/ratings/${userId}/${photoId}`, formData, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
                }
            );
        },

    };
    
export {ratingsAPI};