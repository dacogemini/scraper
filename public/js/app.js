// After the dom loads, if the delete button is clicked run a delete method on the comment and clear the comment fields. refreshes page.
$(document).ready(function(){
  $('.delete-button').on('click', function(e){
    e.preventDefault();
    var qURL = location.href +'/' + $(this).data('comment');
    $.ajax({
      method:"DELETE",
      url:qURL
    })
    location.reload();
  })
})