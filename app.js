const { render } = require('ejs');
index = 0;
const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')
const app = express()
const body = require('body-parser');
const { initial, forEach } = require('lodash');
const datePrimary = require(__dirname + '/date.js')
const port = 3000
let listName = []
let PageType = ""
let arr2 = [];
let mainListName;

app.set('view engine', 'ejs');

let day = ""

app.use(express.static("public"));

app.use(body.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Aryale32:322008@aryale32.saktdb0.mongodb.net/ListDB")

//fruit colletion
const listSchema = mongoose.Schema({
    name: String,
    id: Number
})

let listItemsCollection;
// listNameCollection = mongoose.model("storedRoutes", listSchema);

app.get('/', (req, res) => {
    let sourceDate = datePrimary.getDate()

        res.render("list", {
            newListItem: [],
            listSource: "Welcome to our To-Do list add different Routes for different lists",
            PageType: " "

    })
})


//findbyidandremove is also a mongoose func to remove an elemnent directly by entering his id

// ----- dynamic list routing ------  initializing process

app.get("/:requestedList", (req, res) => {
    if (req.params.requestedList != "favicon.ico") {
        requestedRoute = _.lowerCase(req.params.requestedList)
        listItemsCollection = mongoose.model(`${requestedRoute}`, listSchema);

        listName.push(requestedRoute);


        listItemsCollection.find((err, arr) => {
            res.render("listPrimary", {
                newListItem: arr,
                listSource: requestedRoute,
                PageType: `/${requestedRoute}`
            })

        })
    }
})



app.post("/:requestedList", (req, res) => {
    if (req.params.requestedList != "favicon.ico") {
        requestedRoute = _.lowerCase(req.params.requestedList)

        let PrelistItem = req.body.ListItem

        const type = req.body.type

        pattern = /[1-9][0-9]*/g
        bool = pattern.test(type)
        console.log(bool)
        console.log(type)

        listItemsCollection = mongoose.model(`${requestedRoute}`, listSchema);

        if (type == "add") {
            index++
            console.log('index', index)
            listItem = new listItemsCollection({
                name: PrelistItem,
                id: index
            })
            listItem.save()

        } else if (bool == true) {
            console.log(parseInt(type))
            listItemsCollection.deleteOne({ id: parseInt(type) }, (err) => {
            })
        }

        res.redirect(`/${requestedRoute}`)
    }
})

let port2 = process.env.PORT;
if (port2 == null || port2 == "") {
  port2 = 3000;
}
app.listen(port2);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Not done Templating pratical of copying small snippet code in ejs templet and then using it in all the file that require the same thing.

// there can be a way ki i'll use my way on todolist and angela way on my blog site
// we can't access the collections name so rather we have to create a single colletion. so that we can know different lists name. right?

// i reflect on all my error in blogsite project and make it a best project of mine.

//everything good just not got collections name  
// https://tranquil-chamber-52517.herokuapp.com/