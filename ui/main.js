//counter code
var button = document.getElementById('button');
button.onclick = function (){
    //Create a request to the counter endpoint 
    var request = new XMLHttpRequest();
  
    request.onreadystatechange = function(){
    if(request.readyState == XMLHttpRequest.DONE){
        //Take action
        if(request.status == 200){
            var counter = request.responseText;
            var span = document.getElementById('span');
            span.innerHTML = counter.toString();
        }
    }
    //Do nothing
  };
  
  //Make request 
  request.open('GET','http://milanchhatralia.imad.hasura-app.io/counter', true);
  request.send(null);
};

var nameInput = document.getElementById('namein');
var names = nameInput.value;
var submit = document.getElementById('submit');
submit.onclick = function(){
    var names = ['name1','name2','name3','name4'];
    var list = '';
    for(var i=0;i < names.length;i++){
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('ul');
    ul.innerHTML = list;
    
    
    /*var request = new XMLHttpRequest();
  
    request.onreadystatechange = function(){
    if(request.readyState == XMLHttpRequest.DONE){
        //Take action
        if(request.status == 200){
            var counter = request.responseText;
            var span = document.getElementById('span');
            span.innerHTML = counter.toString();
        }
    }
    //Do nothing
  };
  
  //Make request 
  request.open('GET','http://milanchhatralia.imad.hasura-app.io/counter', true);
  request.send(null);*/
};
