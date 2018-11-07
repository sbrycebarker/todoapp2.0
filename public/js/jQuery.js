$(document).ready(function() {

  $(".data").keyup(function(event){
      if(event.keyCode == 13){
        // alert ("getting band")
          $("#submit").click();
          $('#myBtn').click();
      }
    });


})
