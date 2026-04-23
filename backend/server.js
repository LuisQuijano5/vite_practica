const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://db:27017/myapp";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado a mong"))
  .catch(err => console.error("Error de conexión:", err));

const User = mongoose.model('User', {
  name: String,
  email: { type: String, unique: true },
  password: String
});

app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "Usuario guardado" });
  } catch (e) { res.status(400).send(e); }
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  if (user) res.send({ message: "OK", user });
  else res.status(401).send({ message: "Error" });
});

app.put('/profile', async (req, res) => {
  const { email, newName } = req.body;
  const user = await User.findOneAndUpdate({ email }, { name: newName }, { new: true });
  res.send({ message: "Actualizado", user });
});

app.listen(3000, () => console.log("3000"));