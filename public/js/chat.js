
const socket = io();


socket.on('message',(message)=>{
    console.log('Message From Server',message)
;})


document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.elements.message.value; 

    socket.emit('sendMessage',msg,(err)=>{
        if(err){
            return console.log(err);
        }

        console.log('Delivered');
    })
})

document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geo location is not supported by your browser.!')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log('Position:',"Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
        const positionObject = {Lat:position.coords.latitude, Long : position.coords.longitude };
        socket.emit('sendLocation',positionObject);
    })
})