//counter code
var button = document.getElementById('button');
button.onclick = function () {
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


var submit = document.getElementById('submit-button');
submit.onclick = function () {
    var request = new XMLHttpRequest();
  
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            //Take action
            if(request.status == 200){
                var names = request.responceText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0;i < name.length;i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('ul');
                ul.innerHTML = list;
            }
        }
        //Do nothing
    };
  
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    //Make request 
    request.open('GET','http://milanchhatralia.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
};
