import mongoose from "mongoose"
import OrderModel from "./models/order.model.js"

// const main = async () => {
    

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

// }

// main()


import express from "express" 
import exphbs from "express-handlebars"
const app = express()
const PUERTO = 8080

mongoose.connect("mongodb+srv://LLBdeveloper:admiadmi@cluster0.kdv9gnv.mongodb.net/Pizzalandia?retryWrites=true&w=majority&appName=Cluster0")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");



app.get("/pizzas", async (req, res) => {
    const page = req.query.page || 1
    const limit = 2

    try {
        const pizzasListado = await OrderModel.paginate({},{limit, page})
        
        let arrayPizzas = pizzasListado.docs.map( pizza => {
            const { _id, ...rest } = pizza.toObject()
                return rest
        })

        res.render("pizzas", {
            pizzas: arrayPizzas,
            hasPrevPage: pizzasListado.hasPrevPage, 
            hasNextPage: pizzasListado.hasNextPage,
            prevPage: pizzasListado.prevPage,
            nextPage: pizzasListado.nextPage,
            currentPage: pizzasListado.page,
            totalPages: pizzasListado.totalPages
        })
    } catch (error){
        console.log("error al pedir pizzas", error)
        res.status(500).send("error en el interno servidor")
    }
})

app.listen(PUERTO, ()=>{
    console.log(`escuchando en el puerto ${PUERTO}`)
})

