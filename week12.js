const Resource = 'http://localhost:3000/destinyFireteam'

// this is just so i dont have to keep typing out the server name
$.get(Resource).then(data => console.log(data))
// this is to make sure that the resource page was working

// this is the code used to get data from the main resouce page. it gets the data from the resource page and displays it 
// in the table. It also uses map in order to iterate through all the array objects so that it pulls every team into the table
// it also creates a button so that the object data can be deleted and it assigns an id that the delete button is linked to so it 
// only deletes the object that the button was originally created with.

$.get(Resource).then(data =>  {
    data.map(fireteam => {
        $('tbody').append(
            $(`
                <tr>
                    <td>${fireteam.playerName}</td>
                    <td>${fireteam.playerClass}</td>
                    <td>${fireteam.playerGuild}</td>
                    <td>${fireteam.powerLevel}</td>
                    <td>${fireteam.endGame}</td>
                    <td>${fireteam.id}</td>
                    <td>
                        <button id="trash" class="btn btn-danger" onclick="deletePlayer(${fireteam.id})">Delete</button>   
                    </td>
                </tr>
            `)
        )
    })
})

// this is the function created so that when the submit button is clicked 
// it adds or post a new object to the array in the json data base server
// it adds the information using the inputed values that the user put in the app to build the object
$('#submitFireteam').click(function (){
  
    $.post(Resource, {
      playerName: $('#playerName').val(),
      playerClass: $('#playerClass').val(),
      playerGuild: $('#playerGuild').val(),
      powerLevel: $('#powerLevel').val(),
      endGame: $('#endGame').val(),
    })
  })

  // this is the delete player function using ajax in order to select an id and then delete that entire object connected to that id when the button is clicked
 function deletePlayer (id) {
    $.ajax(`${Resource}/${id}`, {
        method: 'DELETE'
    })
 }


// this updates the data in the server if you want to make a change to any data that you put in the table. it allows you to select an id
// and then change the data for that specific id so that you can pick whos data you update
 function updatePlayer() {
    let id = $(`#updateId`).val()
  
    $.ajax(`${Resource}/${id}`,  {
      method: 'PUT',
      data: {
        playerName: $('#updateName').val(),
        playerClass: $('#updateClass').val(),
        playerGuild: $('#updateGuild').val(),
        powerLevel: $('#updateLevel').val(),
        endGame: $("#updateEndGame").val(),
      }
  
    })
  
  }
  $('#update').click(updatePlayer)
  // this ties the update player function to the update player button so that when it clicks it runs it.