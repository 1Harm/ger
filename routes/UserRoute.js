const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router();
router.get('/', UserController.findAll);
//router.get('/:id', UserController.findOne);
router.get('/:email', UserController.findOne);
router.post('/', UserController.create);
//router.patch('/:id', UserController.update);
router.patch('/:email', UserController.update);
//router.post('/update/:email', UserController.update);
//router.delete('/:id', UserController.destroy);
router.delete('/:email', UserController.destroy);
//router.post('/delete/:email', UserController.destroy);
module.exports = router