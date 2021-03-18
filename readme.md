# Server di Gestione dei  ToDo con Autenticazione JWT

<p>
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
<p>
    <img alt="Supports Express" src="https://img.shields.io/static/v1?label=Express&message=4.16.1&color=%3CCOLOR%3E?style=plastic&logo=Express"/>
    <img alt="Made with Json-Server" src="https://img.shields.io/badge/made%20with-json--server-orange"/>
</p>

## 🚀 Come usarlo

- Installa i packages con `npm install`.
- `npm run dev` per far partire il server.

## Cosa fa
<p>
Il server offre un servizio di gestione dei Task e delle utenze.
</p>
<p>
La parte di gestione delle utenze è un server di autenticazione Jwt che fornisce access Token e refresh Token, con le funzioni di verifica
della validità  del Token e di aggiornamento dell'access Token tramite refresh Token. Le password salvate sono criptate.
Sono presenti le classiche funzioni per la gestione delle utenze: signUp, login, e verifica di validità token.
La parte di  gestione dei task presenta le funzioni di: lista dei task, aggiunta, eliminazione, ricerca tramite username</p>

