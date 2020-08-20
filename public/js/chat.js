
const socket = io();

const $messageDiv = document.querySelector('#message');

//template
const $messageTemplate = document.querySelector('#message-template').innerHTML;

socket.on('message',(message)=>{
    console.log('Message From Server',message);
    const html = Mustache.render($messageTemplate,{
        message
    });
    $messageDiv.insertAdjacentHTML('beforeend',html);
;})

const $messageForm = document.querySelector('#message-form');
const $messageInput = $messageForm.querySelector('input');
const $messageButton = $messageForm.querySelector('button');


$messageForm.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    $messageButton.setAttribute('disabled','disabled');
    const msg = e.target.elements.message.value; 

    
        socket.emit('sendMessage',msg,(err)=>{
            $messageButton.removeAttribute('disabled');
            $messageInput.value = '';
            $messageInput.focus();
             if(err){
                 return console.log(err);
             }
     
             console.log('Delivered');
         })
    
 
})

const $locationButton = document.querySelector('#send-location');

$locationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geo location is not supported by your browser.!')
    }
    
    $locationButton.setAttribute('disabled','disabled');
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log('Position:',"Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
        const positionObject = {Lat:position.coords.latitude, Long : position.coords.longitude };
        socket.emit('sendLocation',positionObject,()=>{
            $locationButton.removeAttribute('disabled');
            console.log('Location Shared');
        }); 
    })
})