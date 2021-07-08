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
    var clear_btn = document.getElementById("clear_btn")

    console.log(clear_btn)
    
    var myFunction = function() {
        if (mouseDown) {
            this.classList.add("clicked");
        }
    };

    for (var i = 0; i < className.length; i++) {
        className[i].addEventListener('mouseover', myFunction, false);
    }


    var clear_map = function() {
        for (var i = 0; i < className.length; i++) {
            className[i].classList.remove("clicked");
        }
    }

    clear_btn.addEventListener('click', clear_map, false);
});

