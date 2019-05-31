const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/myshoping', {        //mydetails is database name.
    useNewUrlParser: true,
    useCreateIndex: true
})