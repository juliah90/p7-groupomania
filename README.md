Clone the GitHub repository to your local machine:
    git clone https://github.com/juliah90/p7-groupomania.git

Change into the project directory:
    cd p7-groupomania

Navigate to the frontend directory and start the frontend server:
    cd frontend
    npm install
    npm start

Navigate to the backend directory and start the backend server using Nodemon:
    cd backend
    npm install
    npx nodemon server

The project uses a postgres SQL database. You will need to create the database using the schema provided in the schema.sql file located in the backend directory.

Refer to the .env-sample file in the backend directory for the required credentials and environment variables. Copy this file to .env and update it with your own credentials. 