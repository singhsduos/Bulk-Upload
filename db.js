const mongoose = require('mongoose')

module.exports = () => {
  mongoose
    .connect('mongodb://localhost:27017/bulk_upload', {
      useNewUrlParser: true
    })
    .then(() => {
      console.log('Mongo connected successfuly')
    })
}
