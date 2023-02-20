'use strict'
const excelToJson = require('convert-excel-to-json')
const { ExcelFile, validFile } = require('../models/file.model')

const getView = (req, res) => {
  res.render('form')
}

const uploadfile = (req, res) => {
  const newFile = req.file.path
  const _config = {
    sourceFile: newFile,
    sheet: 1,
    header: { rows: 2 },
    columnToKey: {
      A: 'name',
      B: 'position',
      C: 'office',
      D: 'age',
      E: 'start_date',
      F: 'salary',
      G: 'uid'
    }
  }
  const result = excelToJson(_config)
  // console.log(result);
  const validationCheck = dataObject => {
    for (let data of dataObject) {
      return data
    }
  }
  const { error } = validFile(validationCheck(result.Sheet1), {
    abortEarly: false
  })

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  ExcelFile.insertMany(result.Sheet1, function (error, docs) {
    if (error) {
      if (error.code === 11000) {
        return res.status(400).send('Unique value required')
      } else {
        return res.status(400).send(error.writeErrors[0].err.errmsg)
      }
    } else {
      return res.send('Your file uploaded successfully')
    }
  })
}

module.exports = { getView, uploadfile }
