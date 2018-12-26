module.exports function (ctx, next) {
  console.log('Request:')
  console.log(ctx.request)
  next()
  console.log('Response:')
  console.log(ctx.response)
}
