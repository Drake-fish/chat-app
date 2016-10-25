import $ from 'jquery';
import messagesend from './messagesend';
import Message from './message';
import loginRender from './loginRender';
import moment from 'moment';

function chatPageRender(newUser) {
    let main = $('main');
    let chatPage = `
      <div class="chat-page">
        <h2> Welcome To The Party!</h2>
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
            data.forEach(function(data, i, arr) {

                const messageContainer = $('.messages');
              var message=$(`<p>${moment(data.timestamp).format('MMMM Do YYYY, h:mm:ss a')} ${data.sender}: ${data.body}</p>`);
                messageContainer.prepend(message);
                if (data.sender === newUser.name) {
                    message.append($('<button class="delete">Delete</button>'));
                }
                $('.delete').on('click', function(e){
                  const deleteSettings={

                    url:"http://tiny-za-server.herokuapp.com/collections/chatmessages/"+data._id,
                    type:"DELETE",
                    success:(data) => {
                      console.log('message deleted');
                  $.ajax(deleteSettings);
                }
            };
          });
        });
        },
        contentType: 'application/json',
        data: JSON.stringify(this)
    };
    $.ajax(getSettings);
  }
setInterval(function(){
  $('.messages').empty();
  getMessages();
},2000);
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
    });

}
export default chatPageRender;
