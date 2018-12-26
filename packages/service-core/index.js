const grpc = require('grpc')
const unionBy = require('lodash/unionBy')
const compose = require('koa-compose')
const minimatch = require('minimatch')

class Application {
  constructor ({ option, services, middlewares }) {
    this.option = Object.assign({ host: '0.0.0.0', port: '5051' }, option)
    this.services = unionBy([].concat(services), 'name')
    this.middlewares = unionBy([].concat(middlewares), 'name')
  }

  listen ({ host, port }) {
    this.option.host = host
    this.option.port = port
    return this.clone()
  }

  add ({ name, service, call }) {
    this.services.push({ name, service, call })
    return this.clone()
  }

  use ({ name, scope, middleware }) {
    this.middlewares.push({ name, scope, middleware })
    return this.clone()
  }

  start () {
    const server = new grpc.Server()
    services.forEach(({ name, service, call }) => {
      const middlewares = this.middlewares
        .filter(({ scope }) => minimatch(name, scope))
        .map(({ middleware }) => middleware)
      const proxy = (data, callback) => {
        const context = Object.assign({ request: {}, response: {}, error: {} }, data)
        const onEnd = ctx => callback(ctx)
        const fn = compose(middlewares.concat(call))
        fn(context).then(onEnd).catch(onEnd)
      }
      server.addService(service, proxy)
    })
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure())
    return server.start()
  }

  clone () {
    return new Application(this)
  }
}

module.exports = Application
