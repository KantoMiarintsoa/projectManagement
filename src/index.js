import express from "express"
import authRouter from "./routes/authRoutes.js"
import path, {dirname} from "node:path"
import { fileURLToPath } from 'node:url';
import session from "express-session";
import {connectDB} from './db.js';
import frontRouter from './routes/frontRoute.js';
import bodyParser from 'body-parser';
import projectRouter from './routes/projectRoutes.js'
import taskRouter from './routes/projectRoutes.js'
import MongoStore from "connect-mongo";

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname)


const app=express()


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// app.post('/', (req, res) => {
//     res.render('index', { title: 'Page d\'Accueil', message: 'Bienvenue ' });
//   });


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
  secret: 'kanto123hkbuio=cfgqwrjhrehsdjhhhjerh', 
  resave: false,           
  saveUninitialized: false,
  cookie: { maxAge: 600000 },
  store:MongoStore.create({
    mongoUrl:"mongodb://localhost:27017/projectManagement"
  })
}));


app.use(checkAuth)

app.use("/auth", authRouter);
app.use("/", frontRouter)
app.use("/project",projectRouter)
// task router is just the project router
// you shouldn't do that
// use only one
// i will use only the project
app.use("/task",taskRouter)
app.use(express.urlencoded({ extended: true }));

const noAuth=[
  "/login","/register","/auth/login", "/auth/register"
]

function checkAuth(req, res, next) {
  const path = req.originalUrl
  if (noAuth.some(url=>url===path) || req.session.user) {
    return next(); 
  } else {  
    return res.redirect('/login'); 
  } 
}
app.use(express.urlencoded({ extended: true }));



// app.get('/index', checkAuth, (req, res) => {
//   res.render('index', { title: 'Page d\'Accueil', message: 'Bienvenue ' + req.session.user.email });
// });

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erreur de déconnexion');
    }
    res.redirect('/login');  
  });
});



connectDB.then((res)=>{
  app.listen(3001, ()=>{
    console.log("server running") 
  })
})