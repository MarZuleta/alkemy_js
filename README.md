# Alkemy JS
JS Challenge FullStack

This project serves as a personal budget manager, allowing the user to add, remove, edit and view transactions, as well as the current budget available. It consists on a Home page, in which the latest 10 transactions can be viewed in order of most recent, and a Transactions page where the full transaction history is located.

## PERN Stack

### Requirements:

Node 10.19 or upper

PostgreSQL installed and database server running, check credentials in ./alkemy_js/api/config/config.js, by default set to username=postgres

### To run on your machine:

Run `npm install` inside ./alkemy_js/client and ./alkemy_js/api to install node modules.

Create .env file inside ./alkemy_js/api specifying NODE_ENV and DB_PASS.

Run `npm run devstart` inside ./alkemy_js/api, then run `npm start`inside ./alkemy_js/client.

Open localhost:3001 on a browser to see project.
