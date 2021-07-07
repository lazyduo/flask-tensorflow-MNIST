document.addEventListener("DOMContentLoaded", function(){

    var mouseDown = 0;
    document.body.onmousedown = function() { 
        ++mouseDown;
    }
    document.body.onmouseup = function() {
        --mouseDown;
    }

    // Handler when the DOM is fully loaded
    var className = document.getElementsByClassName("pixel");
    
    var myFunction = function() {
        if (mouseDown)
            this.classList.toggle("clicked");
    };

    for (var i = 0; i < className.length; i++) {
        className[i].addEventListener('mouseover', myFunction, false);
    }
});

