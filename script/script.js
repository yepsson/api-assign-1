$( document ).ready(function() {


    $(".delete").click(function() {
        $("#delete-input").val(this.getAttribute('data'));
    });

    
    $(".change").click(function() {
        $("#update-id").val(this.getAttribute('data-id'));
        $("#update-namn").val(this.getAttribute('data-namn'));
        $("#update-antal").val(this.getAttribute('data-antal'));
        $("#update-pris").val(this.getAttribute('data-pris'));
    });

});