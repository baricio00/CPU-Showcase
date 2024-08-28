Key Features:
- Interactive CPU List: View and select from a list of CPUs, each with key details such as brand, model, and socket type.
- Responsive Design: a fluid user experience is provided on both desktop and mobile devices, with adaptive views that switch between list and detail modes based on screen size.
- CPU Information: Access information about each CPU, including clock speed, core count, threads, TDP, and pricing.
- Edit and Update: Edit CPU details and save updates directly from the interface. Changes are reflected in real-time and stored in a PostgreSQL database.
- Backend Integration: A Node.js server handles data retrieval and updates, ensuring smooth interaction between the frontend and the PostgreSQL database.

Initialization
- npm init -y
- npm install express pg cors ("express" for building the server, "pg" is the PostgreSQL client for Node.js, "cors" is the middleware to allow Cross-Origin reqests)
- npm install nodemon --save-dev ("nodemon" is set to automatically restart the server on file changes with the dev dependency)
- create the express server
    mkdir server
	cd server
	touch index.js
- npm install axios (for HTTP requests)

cpu-showcase.sql contains a backup of the database that can be dumped on PostgreSQL following these steps:
- Open Terminal or Command Prompt
- Connect to PostgreSQL Server by executing: psql -U postgres
  Enter the password for the Postgres user if prompted
- create a new database by running: createdb your_database
- run '\q' to exit the psql environment
- restore backup using this command to recover the backup file to the database that you created: psql -U postgres -d your_database -f "C:\Users\path\of\the\database\backup.sql"
- enter the password and the database will be recovered from dump file

Start the backend:
- npm run dev

Start the frontend
- npm start
