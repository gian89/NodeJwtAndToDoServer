"use strict";
// require di Moduli Node
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const  app  =  express();
const  router  =  express.Router();

//require di moduli Custom
const {port} = require('./config');


const cors = require('cors');

app.use(cors());
/*
app.use(cors({
  credentials: true,
}));
*/


router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());

app.use(router);


/*
Il server è in ascolto sulla porta definita nella variabile "port"
*/
app.listen(port, () => {
  console.log('Server listening at http://localhost:'  +  port);
});


/*
Gestione del routing fatta direttamente nell'index
*/
router.get('/', (req, res) => {
  res.status(200).send('This is an authentication server');
});
/*
In questo modo una parte del routing viene gestita da un modulo custom e non nell'index'
*/
app.use(require('./MODULES/ROUTING/jwtRouting'));
app.use(require('./MODULES/ROUTING/dbRouting'));
