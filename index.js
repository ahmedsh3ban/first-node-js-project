const express = require("express")
const mongoose = require("mongoose")
const app = express()

const Article = require("./models/article")
const db = "mongodb+srv://ay492210_db_user:tXc7SCWZ7nQ9ZpLY@firstnodejscluster.odo22gr.mongodb.net/?appName=firstNodejsCluster"
mongoose.connect(db).then(() => {
console.log("connected successfully");

}).catch((error) => {
    console.log("error with connection with the db" , error);
    
})
app.use(express.json())
const PORT = 4000
const items = [
    {id: 0, name: 'i phone'},
    {id: 1, name: 'samsung'},
    {id: 2, name: 'nokia'},
    {id: 3, name: 'xaomi'}
]
app.get('/items' , (req , res) => {
    res.send(items)
})
app.get('/item/:id' , (req , res) => {
    res.send('item is de find')
})

app.get('/summations/:num1/:num2' , (req , res) => {
    const num1 = req.params.num1
    const num2 = req.params.num2
    const result = Number(num1) + Number(num2)
    res.send('the result is' + result)
})

app.get('/sayHello' , (req , res) => {
    // const name = req.body.name
    // const age = req.query.age
    
    // res.send(`hello: ${name} , your age is ${age}`)
    // res.json({
    //     name: name,
    //     age: age,
    //     country: 'egypt'
    // })

    // res.send('<p>hello world</p>')
    // res.sendFile(__dirname + "/index.html")
    res.render("index.ejs" , {name: "mohammed"})
})



app.delete('/testingdelete' , (req , res) => {
    res.send("deleted is successfully")
})





// +++++++++++++++ add article to database

app.post("/articles" , async (req , res) => {
    const newArticle = new Article()
    newArticle.title = req.body.title
    newArticle.body = req.body.body
    newArticle.likes = req.body.likes
    await newArticle.save()

    res.send("article is saved successfuly in database")
})
app.get("/articles" , async (req , res) => {
    const data = await Article.find()
    res.status(200).json(data);
    
})

app.get("/articles/:id" , async (req , res) => {
    const id = req.params.id
    const art = await Article.findById(id)
    res.send(art)
})
app.delete("/articles/:id" , async (req , res) => {
    const id = req.params.id
    await Article.findByIdAndDelete(id)
    res.send("article who id: "+ id + "is deleted")
})
app.listen(PORT , () => {
    console.log("i,m listening in port" , PORT);
    
}) 