const { server } = require('./app')

server
  .listen({ host: '0.0.0.0', port: '8080' })
  .start()
