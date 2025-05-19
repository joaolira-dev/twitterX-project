
import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routers/main";

const server = express()
server.use(helmet())
server.use(cors());
server.use(urlencoded({ extended: true }))
server.use(express.json());

// rotas
server.use(router)

server.listen(process.env.PORT || 3000, () => {
   console.log(`Servidor rodando em ${process.env.BASE_URL}`)
})
