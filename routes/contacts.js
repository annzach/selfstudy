const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');



router.get('/', (req, res) => {
  Contact.getAll()
    .then(contacts => {
      res.send(contacts);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
  Contact.getOne(req.params.id)
    .then(contact => {
      res.send(contact);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/', (req, res) => {
  Contact.create(req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.delete('/:id', (req, res) => {
  Contact.delete(req.params.id)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.put('/:id', (req, res) => {
  Contact.update(req.params.id, req.body)
    .then(() => {
      return Contact.getOne(req.params.id);
    })
    .then(contact => {
      res.send(contact);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
