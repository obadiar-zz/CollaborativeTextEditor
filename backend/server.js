const express = require('express')
const app = express()

app.use(express.static('public'))

// Example route
app.get('/', (req, res) => {
  res('Express server is running..')
})

app.listen(process.env.PORT, () => {
  console.log(`Backend server for Electron App running on port ${process.env.PORT}!`)
})
