const express = require('express');
const res = require('express/lib/response');
const {searchBook} = require(__dirname + '/controllers/searchController');
const {sendEmail} = require(__dirname + '/controllers/emailController');
const {showBookInfo} = require(__dirname + '/controllers/bookInfoController');
const app = express();
const session = require('express-session')
//npm install cookie-parser
const cookieParser= require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret :'123'}));

app.get('/',function(req,res){
        res.cookie('bookName','1984',{maxAge:12000}).sendFile(__dirname+'/pages/index.html');
});

// const router = express.Router();
// router.use(function(req,res,next){
//         console.log('Router.use is Triggered');
//         next();
// });
// router.get('/',(req,res)=>{
//         res.sendFile(__dirname+'/pages/index.html')
// });
// app.use('/',router);

app.get('/details/:id', showBookInfo);
//date and time
// app.use('/', function(req, res,next){
//         // //         let ts = Date.now();
//         // // let date_ob = new Date(ts);
//         // // let date = date_ob.getDate();
//         // // let month = date_ob.getMonth() +1;
//         // // let year = date_ob.getFullYear();
//         // // let hours = date_ob.getHours();
//         // // let minutes = date_ob.getMinutes();
//         // // let seconds = date_ob.getSeconds();
//         // // console.log(date+ "-"+ month +  "-"+ year  +" " + hours + ":" + minutes + ":" + seconds);
//         // console.log("Current Time Stamp:"+ Date());

//         next();

//         // console.log("ápp.use Called...!");
// });

app.get('/', function(req, res){
        res.sendFile(__dirname + '/pages/index.html');
});
app.get('/subscribe', sendEmail);
// app.get('/search', function(req, res){
//         res.sendFile(__dirname + '/pages/search.html');
// });
// app.get('/search/:title', searchBook);
//error handling
// app.use(function(err,req,res,next){
//         console.log(err);
// });

// app.get('/login',function(req,res){
//         throw new Error('Page not found');
// });
// app.get('/signup',function(req,res){
//         throw new Error('Account already exists');
// });
//login page
app.get('/login', function(req, res){ 
        if(req.session.visited)
        {
                res.send("Already Logged in");
        }
        else{
        res.sendFile(__dirname + '/pages/login.html');
        };
});
app.post('/login', function(req, res){

if(req.session.visited)
{
        res.send('Already logged in');
}
else{
        if(req.body.username=='John'&& req.body.password=='123')
        {
                req.session.visited=true
                res.redirect('/');
        }   
        else {
                res.send('Failure');
        }
}

});
app.get('/logout',function(req,res){
        req.session.visited= false;
        res.redirect('/login');
})

app.listen(3000, ()=> console.log('Started!'));
// 1. List of books on the home route
// 2. Book information should be shown on a separate route
// 3. Search for a book in the collection
