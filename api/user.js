const express = require('express')
const router = express.Router()
const path = require('path')
// const data = {}
// data.user= require('../data/user.json')
const {deleteUser,getUser,getUserByParam,postUser,updateUser} = require('./../controllers/user')

router.route('/').get(getUser)
.post(postUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:id')
 .get(getUserByParam)

module.exports = router