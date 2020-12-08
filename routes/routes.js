const express = require('express');
const router = require('express-promise-router')();
const MainController = require('../controllers/controller')

router.route('/admin/')
      .get(MainController.index)

router.route('/admin/create-link')
      .post(MainController.create)

router.route('/join/:slug')
      .get(MainController.join);
      
module.exports = router;      