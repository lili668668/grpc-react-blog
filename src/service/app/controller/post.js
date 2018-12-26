const Post = require('../service/post')

const onSuccess = (ctx, next) => (data) => {
  ctx.response.body = data
  ctx.response.status = 200
  next()
}

const onError = (ctx, next) => (err) => {
  ctx.error.body = err
  ctx.response.status = 404
  next()
}

module.exports = class {
  constructor () {
    this.service = new Post()
  }

  list (ctx, next) {
    this.service.list()
      .then(onSuccess(ctx, next))
      .catch(onError(ctx, next))
  }

  show (ctx, next) {
    this.service.show(ctx.request.id)
      .then(onSuccess(ctx, next))
      .catch(onError(ctx, next))
  }

  create (ctx, next) {
    this.service.create(ctx.request.body)
      .then(onSuccess(ctx, next))
      .catch(onError(ctx, next))
  }

  update (ctx, next) {
    this.service.update(ctx.request.body)
      .then(onSuccess(ctx, next))
      .catch(onError(ctx, next))
  }

  remove (ctx, next) {
    this.service.remove(ctx.request.id)
      .then(onSuccess(ctx, next))
      .catch(onError(ctx, next))
  }
}
