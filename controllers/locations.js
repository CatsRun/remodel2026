const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('locations').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('locations')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createLocations = async (req, res) => {
  const locations = {
    name: req.body.name,
    dimensions: req.body.dimensions
  };
  const response = await mongodb.getDb().db().collection('locations').insertOne(locations);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the locations.');
  }
};

const updateLocations = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const locations = {
    name: req.body.name,
    dimensions: req.body.dimensions
  };
  const response = await mongodb.getDb().db().collection('locations').replaceOne({ _id: userId }, locations);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the locations.');
  }
};

const deleteLocations = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('locations').deleteOne({ _id: userId });
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the locations.');
  }
};

module.exports = { getAll, getSingle, createLocations, updateLocations, deleteLocations };