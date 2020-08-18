
const socket = io();


socket.on('message',(message)=>{
    console.log('Message From Server',message)
;})

const $messageForm = document.querySelector('#message-form');
const $messageInput = $messageForm.querySelector('input');
const $messageButton = $messageForm.querySelector('button');

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    $messageButton.setAttribute('disabled','disabled');
    const msg = e.target.elements.message.value; 

    if(!msg){
        socket.emit('sendMessage',msg,(err)=>{
            $messageButton.removeAttribute('disabled');
            $messageInput.value = '';
            $messageInput.focus();
             if(err){
                 return console.log(err);
             }
     
             console.log('Delivered');
         })
    }
 
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