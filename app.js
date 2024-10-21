import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.redirect("/views/home");
});

app.use("/views", viewsRouter);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.emit("updateProducts", products);

  socket.on("newProduct", (product) => {
    const newProduct = { id: products.length + 1, ...product };
    products.push(newProduct);
    io.emit("updateProducts", newProduct);
  });

  socket.on("deleteProduct", (productId) => {
    products = products.filter((product) => product.id !== productId);
    io.emit("removeProduct", productId);
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
