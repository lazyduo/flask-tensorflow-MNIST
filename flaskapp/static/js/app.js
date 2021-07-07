var myFunction = function() {
    console.log('hi');//
};

var className = document.getElementsByClassName("pixel");

for (var i = 0; i < className.length; i++) {
    className[i].addEventListener('click', myFunction, false);
}