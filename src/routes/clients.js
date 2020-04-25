const express = require('express');
const { clientController } = require('../controllers');

const router = express.Router();
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClients);
router.post('/', clientController.insertClient);
router.put('/', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;