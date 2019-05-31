const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

var uploadRouter = require('./route/upload');  
const app = express();
app.use(express.json());
app.use(cors());

app.use("/images", express.static("images"))
app.use(express.static(path.join(__dirname, 'public')));

require('./DB/mongoose');
const User = require('./models/user');
const Item = require('./models/item');
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/insert', (req, res) => {
    var fname= req.body.userFname;
    var lname = req.body.userLname;
    var username = req.body.username;
    var password = req.body.password;

    console.log(req.body);

    var mydata= new User({
        userFname:fname,
        userLname:lname,
        username:username,
        password:password
    })
    mydata.save().then(function () {
        res.send('Data Inserted Successfully');
    }).catch(function (e) {
        res.send(e);
    });
});

app.post('/login', (req, res) => {
    
    var username = req.body.username;
    var password = req.body.password;
console.log(username+" "+password)
    User.findOne({username:username, password:password}).then(function(user){
        if(user){
            res.json("success");
        }
        else{
            res.json("invalid");

        }
    })

});

app.post('/itemadd', (req, res) => {
    var Item_data = new Item(req.body);
    console.log(req.body);
   
    Item_data.save().then(function () {
        res.send('item details added Successfully');
    }).catch(function (e) {
        res.send(e);
    });
});





app.post('/displaydata', (req, res) => {
   
    Item.find().then(function (datas) {
        var itemsdata= JSON.stringify(datas)
        res.send(itemsdata)
    }).catch(function (e) {
   
    });
});

var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
});

// var imageFileFilter = (req, file, cb) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('You can upload only image files!'), false);
//     }
//     cb(null, true);
// };

// var upload = multer({
//     storage: storage,
//     fileFilter: imageFileFilter,
//     limits: { fileSize: 10000000 }
// });

// var uploadRouter = express.Router();

// uploadRouter.route('/upload')
//     .post(upload.single('imageFile'), (req, res) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(req.file);
//     });


app.use('/upload', uploadRouter);


app.listen(3000);