$(() => {
  
  $cloneOfTemplate = $('#template').clone();
  renderList(); 
  $('.table').on('click', '.delete', deleteContacts);
  $('#submitbtn').on('click',addContacts);
  
  $(".editBtn").click(function(){
        $("#editModal").modal();
  });
});

function addContacts(){

  var $uname =$('#firstname').val();
  var $uemail =$('#email').val();
  var $uphone =$('#phoneNum').val();
  var formatDate= new Date(Date.now());

  var obj = {"name":$uname , "emailid":$uemail ,"phonenum":$uphone,"createdat":formatDate};

   $.ajax('/contacts/',{
   type: "POST",
   data: obj,
   url:"./models/contact",
   success: function(msg){
        renderList();
      }
    }
  );
 }


function deleteContacts(){
  debugger;
  console.log('delete inside')
  let personId =$(this).closest('tr').attr('id');
  $.ajax(`/contacts/${personId}`,{
    method:'DELETE',
    success: function(msg) {
      renderList();
    }
  })
  .done(() => {
     console.log('delete success');
  })
  .fail(err => {
    console.log('err',err);
  });
}

function saveEdit(){
  console.log("edit clicked");
}

function openEditModal(){
  console.log('open edit Modal');
}

function renderList() {
console.log('hi ,, render here');
  $.get('/contacts')
    .done(contacts => {
      let $trs = contacts.map(contact => {
      let formattedTime = moment(contact.createdat).format('LLL');
      let $tr = $cloneOfTemplate.clone();
      $tr.removeAttr('id');
      $tr.find('.name').text(contact.name);
      $tr.find('.email').text(contact.emailid);
      $tr.find('.phoneNum').text(contact.phonenum);
      $tr.find('.createdAt').text(formattedTime);
      $tr.attr('id', contact.id);
      $tr.removeClass('hidden');
      return $tr;
    });

    $('#tbody').empty().append($trs);

   });
}