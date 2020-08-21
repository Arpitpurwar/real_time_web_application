const users = [];


// User Utility Function AddUser, DeleteUser, ListUser, UpdateUser  
module.exports = {
    addUser : function({id, username, room }){

        // clean the data
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();

        //Validate the data
        if(!username && !room){
            return {
                error : 'Username or Room are not exists'
            }
        }

        // check For existing user
        const exisitngUser = users.find((user) => {
            return user.room === room  && user.username === username;
        })

        // validate username
        if(exisitngUser){
            return {
                error : 'Username already has been taken'
            }
        }

        // Store the user
        const user =  {id, username, room};
        users.push(user);
        return {user}
    },

    removeUser : function(id){
        const index = users.findIndex((user) => user.id = id)
        if(index !== -1){
            return users.splice(index,1)[0]

        }
    },
    
    getUser : function(id){
      return users.find( (user) => user.id === id)
     
    },

    getUserInRoom : function(room){
        room = room.trim().toLowerCase();
        return users.filter((user) => user.room === room)
         
    }

}