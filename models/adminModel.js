const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  createdAt: {
    type: Number,
    default: Date.now, 
  }
})

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin