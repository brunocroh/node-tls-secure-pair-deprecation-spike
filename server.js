const net = require('net')
const tls = require('tls')
const fs = require('fs')

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}

const server = net.createServer((socket) => {
  console.log('Client Connected')

  const securePair = tls.createSecurePair(
    tls.createSecureContext(options),
    true,
    true,
    false
  )

  socket.pipe(securePair.encrypted)
  securePair.encrypted.pipe(socket)

  securePair.on('secure', () => {
    console.log('TLS connection established')
    
    securePair.cleartext.on('data', (data) => {
      console.log('Server received:', data.toString())
      securePair.cleartext.write('data receveid through secure pair')
    })
  })

  securePair.on('error', (err) => {
    console.error('error:', err)
  })

  socket.on('error', (err) => {
    console.error('socket error:', err)
  })
})

server.listen(8443, () => {
  console.log('Server Listening on port 8443')
})
