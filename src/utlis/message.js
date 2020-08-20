const generateMessage = function(text){
    return {
        text,
        createdAt : new Date().getTime()
    }

}


module.exports = {
    generateMessage
}