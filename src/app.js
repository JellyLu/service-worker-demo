function imgLoad(imgJSON) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', imgJSON.url);
        request.responseType = 'blob';

        request.onload = function() {
            if (request.status === 200) {
                var arrayResponse = [];
                arrayResponse[0] = request.response;
                arrayResponse[1] = imgJSON;
                resolve(arrayResponse);
            } else {
                reject(Error(`Image didn't load successfully`))
            }
        };

        request.onerror = function () {
            reject(Error('There was a network error.'));
        }

        request.send();
    });
}

var imgSection = document.querySelector('section')