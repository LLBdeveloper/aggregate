import mongoose from "mongoose"
import OrderModel from "./models/order.model.js"

const main = async () => {
    mongoose.connect("mongodb+srv://LLBdeveloper:admiadmi@cluster0.kdv9gnv.mongodb.net/Pizzalandia?retryWrites=true&w=majority&appName=Cluster0")

    // const resultado = await OrderModel.aggregate([
    //     {
    //         $match: {
    //             tam: "chica"
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$nombre",
    //             total: {
    //                 $sum: "$cantidad"
    //             }
    //         }
    //     },
    //     {
    //         $sort: {
    //             total: 1
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: 10,
    //             orders: {
    //                 $push: "$$ROOT"
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             orders: "$orders"
    //         }
    //     },
    //     {
    //         $merge: {
    //             into: "reports"
    //         }
    //     }
    // ])
    // console.log(resultado)

}

// main()






import express from "express" 
import exphbs from "express-handlebars"
const app = express()
const PUERTO = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views","./src/views")

app.get("/pizza", (req, res) => {
    res.send('hola mundo')
})

app.listen(PUERTO, ()=>{
    console.log(`escuchando en el puerto ${PUERTO}`)
})