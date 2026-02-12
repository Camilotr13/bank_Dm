import express from 'express'; 
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';
import { notFound } from "./middlewares/notFound.js";



const app = express();

app.use(express.json());
app.use(userRoutes);
app.listen(PORT); 
app.use(notFound);
console.log("Server is running on port", PORT);

app.use((err, req, res, next) => {

   if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({
         message: "Invalid JSON format or invalid characters"
      });
   }

   next();
});


