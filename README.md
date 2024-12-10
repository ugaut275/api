# REST API's for DevHealth

This is the repository that we used for DevHealth to create the REST API's. A new repository was needed to improve the structure and to improve the VSCode extension speed. 

## Runing the code

1. Clone the repository 
2. Create a .env file in the root directory with the template given in the .env-template file. The values should specify the host, database, and user and password to connect to your database.
3. npm install
4. npm start


## REST Endpoints

BaseURL: http://35.225.30.86:8080/

| Method        | Endpoint           | Parameters  | Description  |
| ------------- |:-------------:| -----:| -----:|
| GET  | api/users |  | Retrieve all the users in the users table |
| GET | /api/users:id| id (user) | Retrieve a single user by the ID |
| GET | /api/tasks/:id | id (user) | Retrieve tasks of a single user by ID |
| GET | /api/users/name/:name | name (user) | Retrieve a user by username | 
| POST | /api/users | id, userName, userEmail, password | Add a new user | 
| GET | /api/reminders | | Retrieve all reminders |
| GET | /api/reminders/:id | reminder_id | Retrieve a single reminder by ID | 
| POST | /api/reminders | taskID, reminder_time | Add a new reminder | 
| POST | /api/tasks | user_id, title, priority, status, due_date | Add a new task |
| PUT | /api/tasks/:taskID | taskID | Update a task's status | 
| DELETE | /api/tasks/:taskID | taskID | Delete a task | 
| DELETE | /api/reminders/:reminder_id | reminder_id | Delete a reminder | 
| POST | /api/verify-password | password, hash | Verify a hashed password | 


