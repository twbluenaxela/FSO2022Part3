const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
    console.log('connected to mongo db');
})
.catch((error) => {
    console.log(`Error connecting to MongoDB: `, error.message);
})

const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: 5,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    important: Boolean
  })
  
  noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      //there are two underscores here!
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Note', noteSchema)