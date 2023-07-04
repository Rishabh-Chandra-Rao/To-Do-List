const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname+"/date.js");
const date = require("./views/date");

const app=express();
let items=[]
let workItems=[]
// console.log(date)
// console.log(date());

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",function(req,res){
    
    let day= date.getDate()
        // let today=new Date();
        
        // let options ={
        //     weekday: "long",
        //     day: "numeric",
        //     month:"long"
        // };
        // let day= today.toLocaleDateString("en-US",options)
        // return day;
        
    // var currrentDay = today.getDay();
    // var day =""

    // if(currrentDay===6 || currrentDay===0)
    // {
    //     // res.sendFile(__dirname+"/weekend.html")
    //     day = "weekend"
    // }
    // else{
    //     day = "weekday"
    // // res.sendFile(__dirname+"/weekday.html")
    // }
    // switch(currrentDay){
    //     case 0:
    //         day= "Sunday";
    //     break;
    //     case 1:
    //         day= "Monday";
    //     break;
    //     case 2:
    //         day= "Tuesday";
    //     break;
    //     case 3:
    //         day= "Wednesday";
    //     break;
    //     case 4:
    //         day= "Thrusday";
    //     break;
    //     case 5:
    //         day= "Friday";
    //     break;
    //     case 6:
    //         day= "Saturday";
    //     break;
    //     default: console.log("Error :"+ currrentDay)
    // }~~~
    res.render("list",{listTitle:day, newListItems : items});
});

app.post("/",function(req,res){
    
    // console.log(req.body);
    let  item =req.body.newItem;
    if(req.body.list==="Work"){
        workItems.push(item) 
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect("/")
    }
    
   
})
app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List", newListItems:workItems})
})
app.post("/work",function(req,res){
    let item= req.body.newItem;
    res.redirect("/work")
})
app.get("/about",function(req,res){
    res.render("about") 
})

app.listen(3000,function(){
    console.log("server started at port 3000")
})