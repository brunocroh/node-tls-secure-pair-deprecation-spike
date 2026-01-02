const tls = require('tls')
const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const options = {
  rejectUnauthorized: false
}

const socket = tls.connect(8443, options, () => {

  socket.on('data', (data) => {
    console.log("data", data.toString().trim())
  })

  rl.question('message to send: ', (msg) => {
    socket.write(msg)

    rl.close();

  })

})
