const mongoose = require('mongoose')

const User = mongoose.model('User', {
    userFname: {     //this <name> must be same with the form ma vako name.
        type: String
    },
    userLname: {      //this <name> must be same with the form ma vako name.
        type: String
    },
    username:            //this <name> must be same with the form ma vako name.
    {
        type: String
    },
    password:
    {
        type: String 
    }

})

module.exports = User