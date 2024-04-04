const mongoose = require("mongoose");

const DynamicFormSchema = new mongoose.Schema(
  {
    name: { type: String },
    formData: { type: mongoose.Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

const DynamicFormModel = mongoose.model("dynamic_forms", DynamicFormSchema);

module.exports = DynamicFormModel;
