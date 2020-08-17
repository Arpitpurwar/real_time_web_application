
const socket = io();


socket.on('message',(message)=>{
    console.log('Message From Server',message)
;})


document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.elements.message.value; 

    socket.emit('sendMessage',msg)
})

document.querySelector('#send-location').addEventListener('click',()=>{
    
})