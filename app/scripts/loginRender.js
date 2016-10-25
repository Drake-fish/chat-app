import $ from 'jquery';
import User from './user';
import chatPageRender from './chatPageRender';
function loginRender(newUser){
  location.hash="";
  let mainContainer= $('main');
  let homePage= `
  <div class="title">
    <h1>Welcome to Drake Instant Messanger!</h1>
    <h2>Create a username below to enter</h2>
    <form class="login">
    <input class="username" type="text", val="", placeholder="USERNAME">
    <button class="submit">Login</button>
    </form>
    </div>
      `;

        mainContainer.append(homePage);
      $('.submit').on('click',function(e){
        const username=$('.username').val();
        newUser.name=username;
        e.preventDefault();
        location.hash="chat";
        if(username.length>1){
        location.hash="chat";
      }
      else{
        alert('You must enter a username!');
      }
      });
}
export default loginRender;
