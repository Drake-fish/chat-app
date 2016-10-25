import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import User from './user';
import loginRender from './loginRender';
import chatPageRender from './chatPageRender';
let newUser= new User();
const routerSettings={
routes: {
''    : 'loginRender',
'chat': 'chatPageRender'
},
loginRender: () => {
  $('main').empty();
  loginRender(newUser);
},
chatPageRender: () => {
  $('main').empty();
  chatPageRender(newUser);
}
};

const Router= Backbone.Router.extend(routerSettings);

var router = new Router();

export default router;
