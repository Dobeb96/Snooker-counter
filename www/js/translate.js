var language = English;
var translate = function() {
    var oryginalWords = document.getElementsByClassName('translate');
    if (language != 'undefined') {
        for (var i = 0, len = oryginalWords.length; i < len; i++) {
            if (language[oryginalWords[i].innerHTML]) {
                oryginalWords[i].innerHTML = language[oryginalWords[i].innerHTML];
            }
        }
    }
}; translate();