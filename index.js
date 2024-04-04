const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DynamicFormModel = require("./Models/DynamicForm");
const FormModel = require("./Models/Form");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.listen(5000, () => {
  console.log("Server is running");
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.post("/store-data", async (req, res) => {
  try {
    const data = req.body.data;
    const newForm = new FormModel({
      formData: data,
    });
    await newForm.save();
    res.status(200).json({ message: "Submitted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "SERVER ERRROR" });
  }
});

app.post("/create_dynamic_forms", async (req, res) => {
  try {
    const { formname, data } = req.body;
    const newForm = new DynamicFormModel({
      formname,
      formData: data,
    });
    await newForm.save();
    res.status(200).json({ message: "Submitted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "SERVER ERROR" });
  }
});

app.get("/get-dynamic-form/:id", async (req, res) => {
  try {
    const formId = req.params.id;
    const dynamicForm = await DynamicFormModel.findById(formId);

    if (!dynamicForm) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json(dynamicForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SERVER ERROR" });
  }
});
