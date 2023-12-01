const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://EmilioIM:${password}@cluster0.zvkplwg.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    if (process.argv.length === 3) {
      Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    } else if (process.argv.length === 5) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
      })
    }
  })
  .catch((error) => {
    console.log('Error connecting to Mongo', error.message)
  })
