# Server di Gestione dei  ToDo con Autenticazione JWT

<p>
    <img alt="Supports Express" src="https://img.shields.io/static/v1?label=Express&message=4.16.1&color=%3CCOLOR%3E?style=plastic&logo=Express"/>
    <img alt="Made with Json-Server" src="https://img.shields.io/badge/made%20with-json--server-orange"/>
</p>

## 🚀 Come usarlo

- Installa i packages con `npm install`.
- `npm run dev` per far partire il server.

## Cosa fa
### Il server offre un servizio di gestione dei Task e delle utenze.


- **Gestione delle utenze:**
    - server di autenticazione Jwt che fornisce access Token e refresh Token 
    - funzioni di verifica della validità del Token e di aggiornamento dell'access Token tramite refresh Token
    - le chiamate alla funzione di gestione dei task vengono prime verificate tramite l'access Token
    - le password salvate sono criptate
    - Sono presenti le classiche funzioni: signup, login, e verifica di validità token.
- **Gestione dei Task:**
  - possibilità di aggiungere, modificare, eliminare i task
  - Ricerca dei task tramite username
  
Se vuoi testare il server:

- puoi utilizzare l'app per IOS/ANDROID sviluppata con React Native ed Expo: [ToDoApp](https://github.com/gian89/ToDoApp)
- In alternativa puoi importare in Postman la [collezione di API](Jwt_and_Todo.postman_collection.json) che trovi all'interno del progetto
