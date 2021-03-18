Riguardo la consegna del progetto ho realizzato la parte backend. Mi sono concentrato prima su questo.
Volevo realizzare un frontend in React ma non sono riuscito a portare il progetto ad uno stato avanzato.

é un server di autenticazione Jwt che fornisce accesstoken e refreshToken, con le funzioni di verifica
dell'autorizzazione del Token e di aggiornamento dell'accessToken tramite refreshToken. Le password salvate sono criptate.
Sono presenti oltre le funzioni per la gestione delle utenze (signUp, login, e verifica di validità token)
anche per la gestione dei task ( lista dei task, aggiunta, eliminazione, ricerca tramite username)

Per Prima cosa installare le dipendenze

npm install -g json-server
npm install

Poi bisogna lanciare 2 processi node differenti insieme, sfruttando due terminal diversi o due schede:

json-server --watch db.json    //che farà partire il server legato al db



node .\app.js  // per far partire il server che gestisce il routing
