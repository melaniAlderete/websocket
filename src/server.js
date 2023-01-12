import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import indexRouter from "./routes/views.routes.js";
import ProductManager from "./helpers/productManager.js";
import { Server } from "socket.io";

const app = express();
const httpServer = app.listen(5700, () => console.log("Server on port 5700"));
const io = new Server(httpServer);

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}))

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`))
app.use("/", indexRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});



let historial = ProductManager.getProducts();

io.on("connection", (socket) => {
  socket.emit("products", historial);

  socket.on("addProduct", (data) => {
    ProductManager.addProduct(data);
    io.emit("products", historial);
    console.log("Se ha añadido un producto");
  });

  socket.on('products', (data) => {
    if (data != null) {
        const product = {
        title: data.title,
        category: data.category,
        price: data.price,
        code: data.code,
        stock: data.stock
        }
        products.push(product);
    }
    io.emit('products', products)
  });

  socket.on("deleteProduct", (id) => {
    ProductManager.deleteProduct(id);
    io.emit("products", historial);
    console.log("Se ha eliminado un producto");
  });
});

