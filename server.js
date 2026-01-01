const net = require('net')
const tls = require('tls')
const fs = require('fs')

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
}

const server = net.createServer((socket) => {
  console.log('Client Connected')
  const pair = tls.createSecurePair(
    tls.createSecureContext(options),
    false
  )

  socket.pipe(pair.encrypted)
  pair.encrypted.pipe(socket)

  socket.resume()

  socket.on('error', console.error)

  pair.on('secure', () => {
    console.log('Secure Connection Established')

    pair.cleartext.on('data', (data) => {
      console.log('Server received:', data)
      pair.cleartext.write('Write TLS Server')
    })
  })

  pair.encrypted.on('error', (err) => {
    console.error('encrypted error:', err)
  })

  pair.cleartext.on('error', (err) => {
    console.error('cleartext error:', err)
  })
})

server.listen(8443, () => {
  console.log('Server Listening on port 8443')
})
