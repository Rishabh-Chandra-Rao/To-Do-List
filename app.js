//Reqs
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//Req Calls

const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
mongoose.connect("mongodb://0.0.0.0:27017/To-Do-list");


//----------------------------Mongoose--------------------------------------//


//schema

const itemSchema = {
    name:String 
};


//Mongoose model (or a collection that follows a schema)
const Item = mongoose.model("Item",itemSchema);


//Mongoose new documents (or adding new items in the collection)
const item1 =new Item({
    name:"Welcome to our To-Do List"
});

const item2 =new Item({
    name:"Hit + button to add new Items"
});
const item3 =new Item({
    name:"<< Select this to Delete Item"
});

const defaultItems=[item1,item2,item3];

//List schema and model
const listSchema = {
    name:String,
    items:[itemSchema]
 };

 const List = mongoose.model("List",listSchema);

async function getItems(){
    const Items = await Item.find({});
    return Items;
    
  }

async function getLists(){

    const Lists = await Lists.findOne({name: customListName});
    return Lists;
    
  }


  //------------------------------Routes-------------------------------------//
app.get("/",function(req,res){
    
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


app.get("/:customListName",function(req,res){
    const customListName =req.params.customListName;

   List.findOne({name:customListName})
   .then((foundList) => {
       console.log("list exists");
   })
    .catch(function () {
        console.log("do not exists");
    
    })

    
    const list = new List({
        name : customListName,
        items: defaultItems
    });
    list.save();
});

//Server start feedback
app.listen(3000,function(){
    console.log("server started at port 3000")
})