const grpc = require('grpc')
const path = require('path')

const POST_PATH = path.join(__dirname, './services/post.proto')
const PostService = grpc.load(POST_PATH).PostService

module.exports = {
  PostService
}
