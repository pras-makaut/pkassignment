const fileupload = require('express-fileupload')
const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');

const ejs = require('ejs');
const imgArr=[];
const app = express();
app.set('view engine', 'ejs');
app.use(fileupload(),express.static("public"));
app.get("/signup",(req,res) => {
    res.render("signup");
});
app.get("/login",(req,res) => {
    res.render("login");
});
app.get("/upload",(req,res) => {
    res.render('upload');
});
app.post("/upload",(req,res) => {
   sampleFile = req.files.myFile;
   console.log(sampleFile)
   uploadPath = __dirname + '/Images/' + sampleFile.name;
   var date = new Date();
   // we will set the expiary time of the image with current time + 4 hour  
   var timestamp = Math.floor(date.getTime()/1000.0) + (4*60*60);
   const unixEpochTimeMS = timestamp * 1000;
    const d = new Date(unixEpochTimeMS);
// Careful, the string output here can vary by implementation...
    const strDate = d.toLocaleString();
    let imgobj={
       fileName:uploadPath,
       expiraryTime:strDate
   }
   imgArr.push(imgobj)
   console.log(imgArr)
   res.redirect("/data")
   
   // Use the mv() method to place the file somewhere on your server
//    sampleFile.mv(uploadPath, function(err) {
//      if (err)
//        return res.status(500).send(err);
 
//        res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify({ status: 'success', path: '/Images/' + sampleFile.name }))
    
//    });
})
app.get('/data',(req,res) => {
    res.render('show',{
        productsarray:imgArr
    })
})


app.listen(3000);
