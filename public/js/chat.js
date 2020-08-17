
const socket = io();


socket.on('message',(message)=>{
    console.log('Message From Server',message)
;})


document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = document.querySelector('input').value; 

    socket.emit('sendMessage',msg)
})