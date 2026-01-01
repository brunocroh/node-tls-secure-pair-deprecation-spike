const net = require('net')
const tls = require('tls')

const socket = net.connect(8443)

const pair = tls.createSecurePair(
  tls.createSecureContext({
    rejectUnauthorized: false
  }),
  true,
)

socket.pipe(pair.encrypted)
pair.encrypted.pipe(socket)
socket.resume()

pair.encrypted.write(Buffer.alloc(0))


pair.on('secure', () => {
  console.log('Client Secure Connection Established')

  pair.cleartext.on('data', (data) => {
    console.log('Client received:', data.toString())
    pair.cleartext.end()
  })
  
  pair.cleartext.write("Client Message")
})

pair.encrypted.on('error', (err) => {
  console.error('encrypted error:', err)
})

pair.cleartext.on('error', (err) => {
  console.error('cleartext error:', err)
})
