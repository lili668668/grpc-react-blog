const Post = require('../model/post')

module.exports = class {
  async list () {
    const posts = await Post.findAll()
    return posts
  }

  async show (id) {
    return await Post.findOne({
      where: { id }
    })
  }

  async create (post) {
    return await Post.create(post)
  }

  async update (post) {
    return await Post.update(post, {
      where: { id: post.id }
    })
  }

  async remove (id) {
    const post = await Post.findOne({
      where: { id }
    })
    await Post.destroy({
      where: { id }
    })
    return post
  }
}
