document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded

    // mouseDown handling
    var mouseDown = 0;
    document.body.onmousedown = function() { 
        mouseDown = 1;
    }
    document.body.onmouseup = function() {
        mouseDown = 0;
    }

    // handling pixel bitmap
    var className = document.getElementsByClassName("pixel");
    var clear_btn = document.getElementById("clear_btn");
    var classify_btn = document.getElementById("classify_btn");
    var modelupdate_btn = document.getElementById("modelupdate_btn");
    var bitmap = ''

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
        $('#answer').text("Click 'Classify' button!");
        $('#status').text('');
    }

    var classify_bitmap = function() {
        bitmap = '';
        for (var i = 0; i < className.length; i++) {
            if (className[i].classList != "pixel"){
                bitmap += '1'
            }
            else {
                bitmap += '0'
            }
        }
        $.ajax({
            url: '/getPrediction',
            type: 'POST',
            data: {
                'bitmap': bitmap,
            },
            success: function(res) {
                let response = jQuery.parseJSON(res);
                $('#answer').text('Hmm... This is ' + response.answer + '!!!!!!');
            }
        })
    }

    var model_update = function(){
        $("button").prop('disabled', true);
        $('#status').text('Warning! Model is now updating...');
        $.ajax({
            url: '/calcModelWeights',
            type: 'POST',
            data: {},
            success: function(res){
                console.log(res)
                $("button").prop('disabled', false);
                $('#status').text('Model update complete!!');
            }

        })
    }

    clear_btn.addEventListener('click', clear_bitmap, false);
    classify_btn.addEventListener('click', classify_bitmap, false);
    modelupdate_btn.addEventListener('click', model_update, false);
});

