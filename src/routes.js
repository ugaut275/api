module.exports.register = (app, database) => {
    // Root Route
    app.get('/', async (req, res) => {
        res.status(200).send("This is running!");
    });

    // Retrieve all users
    app.get("/api/users", async (req, res) => {
        try {
            const records = await database.query('SELECT * FROM user');
            res.status(200).json(records);
        } catch (error) {
            console.error("Database query failed:", error);
            res.status(500).json({ message: "An error occurred while fetching users." });
        }
    });

    // Retrieve a single user by ID
    app.get("/api/users/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const records = await database.query("SELECT * FROM user WHERE id = ?", [id]);
            if (records.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(records);
        } catch (error) {
            console.error("Database query failed:", error);
            res.status(500).json({ message: "An error occurred while fetching the user." });
        }
    });

    // Retrieve tasks of a single user by user ID
    app.get("/api/tasks/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const records = await database.query("SELECT * FROM tasks WHERE user_id = ?", [id]);
            if (records.length === 0) {
                return res.status(404).json({ message: "Tasks not found for the user" });
            }
            res.status(200).json(records);
        } catch (error) {
            console.error("Database query failed:", error);
            res.status(500).json({ message: "An error occurred while fetching tasks." });
        }
    });

    // Retrieve a user by username
    app.get("/api/users/name/:name", async (req, res) => {
        const { name } = req.params;
        try {
            const records = await database.query("SELECT * FROM user WHERE userName = ?", [name]);
            if (records.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(records);
        } catch (error) {
            console.error("Database query failed:", error);
            res.status(500).json({ message: "An error occurred while fetching the user." });
        }
    });

    // Add a new user
    app.post("/api/users", async (req, res) => {
        const { id, userName, userEmail, password } = req.body;
        if (!id || !userName || !userEmail || !password) {
            return res.status(400).json({ message: "All fields (id, userName, userEmail, password) are required." });
        }

        try {
            await database.query(
                "INSERT INTO user (id, userName, userEmail, password) VALUES (?, ?, ?, ?)",
                [id, userName, userEmail, password]
            );
            res.status(201).json({ message: "User added successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while adding the user." });
        }
    });

    // Retrieve all reminders
    app.get("/api/reminders", async (req, res) => {
        try {
            const records = await database.query("SELECT * FROM reminders");
            res.status(200).json(records);
        } catch (error) {
            console.error("Database query failed:", error);
            res.status(500).json({ message: "An error occurred while fetching reminders." });
        }
    });

    // Retrieve a single reminder by ID
    app.get("/api/reminders/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const records = await database.query("SELECT * FROM reminders WHERE reminder_id = ?", [id]);
            if (records.length === 0) {
                return res.status(404).json({ message: "Reminder not found" });
            }
            res.status(200).json(records);
        } catch (error) {
            console.error("Database query failed:", error);
            res.status(500).json({ message: "An error occurred while fetching the reminder." });
        }
    });

    // Add a new reminder
    app.post("/api/reminders", async (req, res) => {
        const {taskID, reminder_time} = req.body;
        if (!taskID || !reminder_time) {
            return res.status(400).json({
                message: "The fields (taskID, reminder_time) are required.",
            });
        }

        try {
            await database.query(
                "INSERT INTO reminders (taskID, reminder_time) VALUES (?, ?)",
                [taskID, reminder_time]
            );
            res.status(201).json({ message: "Reminder added successfully" });
        } catch (error) {
            console.error("Error adding reminder:", error);
            res.status(500).json({ 
                message: "An error occurred while adding the reminder. \n Error:" + error
            });
        }
    });

    // Add a new task
    app.post("/api/tasks", async (req, res) => {
        const { user_id, title, description, priority, status, due_date } = req.body;
        if (!user_id || !title || !priority || !status || !due_date) {
            return res.status(400).json({
                message: "Fields (user_id, title, priority, status, due_date) are required.",
            });
        }

        try {
            const result = await database.query(
                "INSERT INTO tasks (user_id, title, description, priority, status, due_date) VALUES (?, ?, ?, ?, ?, ?)",
                [user_id, title, description, priority, status, due_date]
            );
            res.status(201).json({ message: "Task added successfully", taskID: result.insertId });
        } catch (error) {
            console.error("Error adding task:", error);
            res.status(500).json({ message: "An error occurred while adding the task." });
        }
    });

    // Update a task's status
    app.put("/api/tasks/:taskID", async (req, res) => {
        const { taskID } = req.params;
        const { status } = req.body;
        if (!taskID || !status) {
            return res.status(400).json({ message: "taskID and status are required." });
        }

        try {
            const result = await database.query(
                "UPDATE tasks SET status = ? WHERE taskID = ?",
                [status, taskID]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "Task updated successfully" });
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ message: "An error occurred while updating the task." });
        }
    });

    // Delete a task
    app.delete("/api/tasks/:taskID", async (req, res) => {
        const { taskID } = req.params;
        if (!taskID) {
            return res.status(400).json({ message: "taskID is required." });
        }

        try {
            const result = await database.query("DELETE FROM tasks WHERE taskID = ?", [taskID]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error("Error deleting task:", error);
            res.status(500).json({ message: "An error occurred while deleting the task." });
        }
    });
};
