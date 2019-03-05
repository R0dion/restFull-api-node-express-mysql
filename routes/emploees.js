const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/', (req, res) => {
   userService.getAllEmploees().then((fulfilled) => {
    res.status(200).send(fulfilled);
  }).catch((err) => {
    res.status(500).send(err);
  });

});

router.get('/:id', (req, res) => {
  userService.getEmploeesById(req.params.id).then((fulfilled) => {
    res.status(200).send(fulfilled);
  }).catch((err) => {
    res.status(500).send(err);
  });

});

router.post('/', (req, res) => {
  userService.addEmploees(req.body).then((fulfilled) => {
    res.status(201).send(fulfilled);
  }).catch((err) => {
    res.status(500).send(err);
  });

});

router.delete('/:id', (req, res) => {
  userService.deleteEmploeesById(req.params.id).then((fulfilled) => {
    res.status(201).send(fulfilled);
  }).catch((err) => {
    res.status(500).send(err);
  });

});

router.put('/:id', (req, res) => {
  userService.updateEmploeesById(req.body, req.params.id).then((fulfilled) => {
      res.status(201).send(fulfilled);
    }).catch((err) => {
      res.status(500).send(err);
    });

});

module.exports = router;
