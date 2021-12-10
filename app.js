const express = require('express')
const app = express()

const routes = require('./routes/tasks')

const notFound = require('./middleware/not-found')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', routes)

app.use(notFound)

const port = process.env.PORT || 5000

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
