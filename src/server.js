import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils";
import homeRouter from "./src/routes/views.routes.js";
import ProductManager from "./src/helpers/productManager.js";
import { Server } from "socket.io";

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log("Server on port 3000"));
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views/");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "./public"));
app.use("/", homeRouter);

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});



let historial = ProductManager.getProducts();

io.on("connection", (socket) => {
  console.log("Se ha conectado el socket con id : !", socket.id);

  socket.emit("products", historial);

  socket.on("addProduct", (data) => {
    ProductManager.addProduct(data);
    io.emit("products", historial);
    console.log("Se ha añadido un producto");
  });

  socket.on("deleteProduct", (id) => {
    ProductManager.deleteProduct(id);
    io.emit("products", historial);
    console.log("Se ha eliminado un producto");
  });
});
