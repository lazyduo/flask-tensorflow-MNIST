document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded

    // mouseDown
    var mouseDown = 0;
    document.body.onmousedown = function() { 
        ++mouseDown;
    }
    document.body.onmouseup = function() {
        --mouseDown;
    }

    // handling pixel bitmap
    var className = document.getElementsByClassName("pixel");
    var clear_btn = document.getElementById("clear_btn")
    
    var fill_bitmap = function() {
        if (mouseDown) {
            this.classList.add("clicked");
        }
    };

    for (var i = 0; i < className.length; i++) {
        className[i].addEventListener('mouseover', fill_bitmap, false);
    }


    var clear_bitmap = function() {
        for (var i = 0; i < className.length; i++) {
            className[i].classList.remove("clicked");
        }
    }

    clear_btn.addEventListener('click', clear_bitmap, false);
});

