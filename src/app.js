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
        };

        request.send();
    });
}

var imgSection = document.querySelector('section');

window.onload = function () {
    Gallery.images.forEach(function(image) {
       imgLoad(image)
           .then(function(arrayResponse) {
               var myImage = document.createElement('img');
               var myFigure = document.createElement('figure');
               var myCaption = document.createElement('caption');
               var imageURL = window.URL.createObjectURL(arrayResponse[0]);

               myImage.src = imageURL;
               myImage.setAttribute('alt', arrayResponse[1].alt);

               myCaption.innerHTML = '<strong>' + arrayResponse[1].name + '</strong>: Taken by' + arrayResponse[1].credit;

               imgSection.appendChild(myFigure);
               myFigure.appendChild(myImage);
               myFigure.appendChild(myCaption);
           })
           .catch(function(error) {
               console.log(error);
           })
    });
};
