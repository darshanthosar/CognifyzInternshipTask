
const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../TASK_1_HTML_STRUCTURE"));


app.use("/css", express.static(path.join(__dirname, "../TASK_3_CSS_STYLING")));
app.use("/js", express.static(path.join(__dirname, "../TASK_4_JS_VALIDATION")));


const submissions = [];


app.get("/", (req, res) => {
  res.render("index", { error: null, values: {} });
});

app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;

  // Server-side validation (simple) //
  if (!name || name.trim().length < 3) {
    return res.status(400).render("index", { error: "Name must be at least 3 characters", values: req.body });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).render("index", { error: "Please enter a valid email", values: req.body });
  }


  const entry = { id: Date.now(), name: name.trim(), email: email.trim() };
  submissions.push(entry);

  return res.render(path.join(__dirname, "../TASK_5_DATA_RENDERING/success.ejs"), { name: entry.name, email: entry.email });
});

app.get("/all", (req, res) => {
  res.send(`<h3>All submissions (in-memory)</h3><pre>${JSON.stringify(submissions, null, 2)}</pre><a href="/">Back</a>`);
});

// Start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
