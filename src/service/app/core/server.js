const Core = require('service-core')

const log = require('../middleware/log')

const {
  PostService
} = require('grpc-react-blog-protos')

const Post = require('./controller/post')

const server = new Core()
  .use({ name: 'log', scope: '*', middleware: log })
  .add({ name: 'post', service: PostService, call: new Post() })

module.exports = server
