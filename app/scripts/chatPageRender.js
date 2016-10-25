import $ from 'jquery';
import Message from './message';
import loginRender from './loginRender';
import moment from 'moment';

function chatPageRender(newUser) {
    let main = $('main');
    let chatPage = `
      <div class="chat-page">
        <h2 class="welcome"> Welcome To The Party ${newUser.name}</h2>
        <div class="messages">
          <button class="exit">Exit</button>
        </div>
        <form class="type-messages">
          <input type="text", class="message-box", placeholder="type your message here">
          <button class="submit-message">Submit</button>
        </form>
      </div>`;
      function getMessages(){
    const getSettings = {
        url: "http://tiny-za-server.herokuapp.com/collections/chatmessages",
        type: "GET",
        success: (data) => {
          $('.messages').empty();
          data.forEach(function(data, i, arr) {
            const messageContainer = $('.messages');
              let message=$(`<p class="date"> On ${moment(data.timestamp).format('MMMM Do YYYY, h:mm:ss a')} <br>
                                               ${data.sender}: ${data.body}</p>`);
              let name=$('.name');
                messageContainer.prepend(message);
                if (data.sender === newUser.name) {
                    message.append($('<button id="delete" class='+data._id+'>Delete</button>'));
                }
                $('.'+ data._id).on('click', (e) =>{
                  let target= new Message(data.timestamp, data.name, data.body, data._id);
                  target.delete();
                });

            });
        },
        contentType: 'application/json',
        data: JSON.stringify(this)
    };
    $.ajax(getSettings);
  }
setInterval(function(){
  getMessages();
},1000);
main.html(chatPage);
    $('.exit').on('click', function(e) {
        e.preventDefault();
        location.hash = "";
    });



    $('.submit-message').on('click', function() {
        const username = newUser.name;
        const timestamp = new Date();
        const body = $('.message-box').val();
        const message = new Message(timestamp, username, body);
        message.send();
        console.log('message sent');
        $('.message-box').val('');
    });

}
export default chatPageRender;
