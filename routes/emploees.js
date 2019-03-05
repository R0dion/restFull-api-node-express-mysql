const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/', async (req, res) => {
  try {
    const getData = await userService.getAllEmploees();
    res.status(200).send(getData);
  } catch (err) {
    res.status(500).send(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
  const getData = await userService.getEmploeesById(req.params.id);
    res.status(200).send(getData);
  } catch (err) {
    res.status(500).send(err);
  }

});

router.post('/', async (req, res) => {
  try {
    const postData = await userService.addEmploees(req.body);
    res.status(201).send(postData);
  } catch (err) {
    res.status(500).send(err);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const deleteData = await userService.deleteEmploeesById(req.params.id);
      res.status(201).send(deleteData);

  } catch (err) {
    res.status(500).send(err);

  }

});

router.put('/:id', async (req, res) => {
  try {
    const putData = await userService.updateEmploeesById(req.body, req.params.id);
      res.status(201).send(putData);

  } catch (err) {
    res.status(500).send(err);
  }

});

module.exports = router;
