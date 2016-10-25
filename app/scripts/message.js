import $ from 'jquery';


function Message(timestamp,sender,body,id){
  'use strict';
  this.timestamp=timestamp;
  this.sender=sender;
  this.body=body;
  this._id=id;
  return this;
}

Message.prototype.send= function(){
  console.log(this);
  const postSettings={
    url: "http://tiny-za-server.herokuapp.com/collections/chatmessages",
    type: "POST",
    success: (data) => {
      console.log(data);
    },
    contentType: 'application/json',
    data: JSON.stringify(this)

  };
  $.ajax(postSettings);

};
Message.prototype.delete=function(){
  let id=this._id;
  let deleteSettings={
    url:"http://tiny-za-server.herokuapp.com/collections/chatmessages/"+ id,
    type:"DELETE",
    success: function(data,status,xhr){
      console.log('message deleted');
    },
    error: function(){}
  };
  $.ajax(deleteSettings);
};


export default Message;
