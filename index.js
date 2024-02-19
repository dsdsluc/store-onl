const express = require('express')
const app = express();
require('dotenv').config();
const system = require("./configs/system");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const moment = require("moment");
const http = require("http");
const { Server } = require("socket.io");

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }))

const database = require("./configs/database")
database.connect();

//SocketIO
const server = http.createServer(app);
const io = new Server(server);

global._io = io

//End SocketIO

//Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// TinyMCe
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// End TinyMCe

const port = process.env.PORT;
const route = require("./routes/client/index.route"); 
const routeAdmin = require("./routes/admin/index.route");

app.use(express.static(`${__dirname}/public`))
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');


//Routes
route(app);
routeAdmin(app)
app.get("*",(req,res)=>{
  res.render("client/pages/errors/404",{
    pageTitle: "404 Not Found"
  })
})
//End Routes

// Variable
app.locals.prefixAdmin = system.prefixAdmin
app.locals.moment = moment
// End Variable
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
