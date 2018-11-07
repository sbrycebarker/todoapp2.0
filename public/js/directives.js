angular.module('myApp').directive('newTask', function() {
  $(document).ready(function() {
      console.log("jQ ready")

    $(".data").keydown(function(event){

        if(event.keyCode == 13){
          // alert ("task written down")
            $("#submit").click();
            // $('#myBtn').click();
        }
      });


  })


  return {
    restrict: 'E',
    template: `
    <div class="newTask" style:" margin: 0;">
    <input id="taskdata" class="data" name="task" ng-model="text" placeholder="Enter Task">

    <button id="submit" class="submit" ng-click="postData( {text:text, user_id: userid} ); showmenu = !showmenu">Create Task</button>
    </div>

     `

    // <script>
    // $(document).ready(function() {
    //
    //   $(".data").keyup(function(event){
    //       if(event.keyCode == 13){
    //         // alert ("getting band")
    //           $("#submit").click();
    //       }
    //     });
    //
    //
    // })
    // </script>
}

$(document).ready(function() {

  $(".data").keyup(function(event){
      if(event.keyCode == 13){
        // alert ("getting band")
          $("#submit").click();
      }
    });


})

})








//
// document.getElementById("createbutton").onclick = function() {myFunction()};
//
// function myFunction() {
//     document.getElementById("newTasks").classList.toggle("show");
// }
