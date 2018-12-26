const { db } = require('../')
const Sequelize = require('sequelize')

const Post = db.define('post', {
  id: {
    type: Sequelize.UUID,
    title: Sequelize.TEXT,
    content: Sequelize.TEXT,
    author: Sequelize.STRING,
    createTime: Sequelize.DATE,
    updateTime: Sequelize.DATE
  }
})

module.exports = Post
