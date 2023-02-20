const mongoose = require('mongoose')
const Joi = require('joi')

const excelFileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  office: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  uid: {
    type: String,
    required: true,
    unique: [true, 'value must be unique']
  }
})

const ExcelFile = mongoose.model('ExcelFile', excelFileSchema)

const validFile = inputFile => {
  const schema = {
    name: Joi.string().required(),
    position: Joi.string().required(),
    office: Joi.string().required(),
    age: Joi.number().required(),
    start_date: Joi.date().required(),
    salary: Joi.number().required(),
    uid: Joi.string().required()
  }
  return Joi.validate(inputFile, schema)
}

module.exports.ExcelFile = ExcelFile
module.exports.validFile = validFile
