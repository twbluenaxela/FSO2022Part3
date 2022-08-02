/* eslint-disable no-undef */
const mongoose = require('mongoose')

/**
 * NOTE: You need to add your IP address to MongoDB Atlas by running
 * hostname -I
 * Why? Doesn't 0.0.0.0/0 work just fine? Sometimes it does. But it's not guaranteed.
 * So you need to additionally add the IP addresses you get from running that linux command,
 * and then add that to MongoDB Atlas > Security > Network Access
 * Ok, updated note. It seems like it's quite unreliable. Just keep trying a couple times.
 * OK it was actually some kind of network error with WSL I think.
 */

// eslint-disable-next-line no-undef
if(process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

//FSO says to use process.argv[2] but for some reason that doesn't work. if you do slice however it works.
const password = process.argv.slice(2)
const databaseName = 'noteApp'

const url =
`mongodb+srv://admin:${password}@cluster0.yjj12od.mongodb.net/${databaseName}?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// Note.find({important: true}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     })
//     mongoose.connection.close()
// })

const note = new Note({
  content: 'Callback functions suck',
  date: new Date(),
  important: true
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})