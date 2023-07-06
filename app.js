const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname+"/date.js");
// const date = require("./views/date");

const app=express();
// let items=[]
// let workItems=[]
// console.log(date)
// console.log(date());

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
mongoose.connect("mongodb://0.0.0.0:27017/To-Do-list");

//schema

const itemSchema = {
    name:String 
};

const Item = mongoose.model("Item",itemSchema);

const item1 =new Item({
    name:"welcome"
});

const item2 =new Item({
    name:"hiii"
});
const item3 =new Item({
    name:"bye"
});

const defaultItems=[item1,item2,item3];
// Item.insertMany(defaultItems)
//   .then(function () {
//     console.log("Successfully saved  items to DB");
//   })
//   .catch(function (err) {
//     console.log(err);
  
// });

async function getItems(){

    const Items = await Item.find({});
    return Items;
    
  }

app.get("/",function(req,res){
    
    // let day= date.getDate()
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
    // Item.find({})
    // .then(function () {
    //     console.log(data);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
      
    // });

    // Item.find({}, function (err, docs) {
    //     if (err){
    //         console.log(err);  
    //     }
    //     else{
    //         console.log("First function call : ", docs);
    //     }
    // });

    getItems().then(function(FoundItems){
        if(FoundItems.length===0){
                Item.insertMany(defaultItems)
                .then(function () {
                    console.log("Successfully saved  items to DB");
                })
                .catch(function (err) {
                    console.log(err);
                
                });
        }
        else{
        
        // console.log(FoundItems)
    res.render("list",{listTitle:"Today", newListItems : FoundItems});
        }
    });
});

app.post("/",function(req,res){
   
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });

    item.save();

    res.redirect("/");
    // console.log(req.body);
    // let  item =req.body.newItem;
    // if(req.body.list==="Work"){
    //     workItems.push(item) 
    //     res.redirect("/work")
    // }else{
    //     items.push(item);
    //     res.redirect("/")
    // }
    
   
});

app.post("/delete",function(req,res){
    const checkedItemId =req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId)
    .then(function () {
        console.log("Successfully deleted items from DB");
    })

    .catch(function (err) {
        console.log(err);
    
    });
    res.redirect("/")
});


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