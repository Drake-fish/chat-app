import $ from 'jquery';
import User from './user';
import chatPageRender from './chatPageRender';
function loginRender(newUser){
  location.hash="";
  let mainContainer= $('main');
  let homePage= `
  <div class="title">
    <h1>Welcome to Drake Instant Messanger!</h1>
    <span>Making our customers socially awkward since 2016</span>
    <img class="homepic" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT2yIr_SQQDOv5wEQ85oYsYKB6Or4ONa83D3cxj4IPBsG11L4vaQA">
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
        if(username===''){
          location.hash='';
          alert('You must enter a username!');
      }
      else{
        location.hash='chat';
      }
      });
}
export default loginRender;
