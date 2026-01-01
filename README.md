# Node TLS SecurePair spike

This one is just a working example to be sure how we need
to implement migration from tls.createSecurePair/tls.SecurePair to 
tls.TLSSocket

# Create certificates 

```
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout key.pem -out cert.pem -days 365
```
