// Install default packages
const express = require('express');
const path = require('path')


// Take the instance of express Constructor
const app = express();

// Take default port or Enviornmental Port
const port = process.env.PORT || 3000

// Bring static code form public folder
const publicDirectoryPath = path.join(__dirname, '../public')

//Render public folder to UI
app.use(express.static(publicDirectoryPath))

// Listen server on Defined Port
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})