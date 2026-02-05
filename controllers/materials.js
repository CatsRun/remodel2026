const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('materials').find();
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
    .collection('materials')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createMaterial = async (req, res) => {
  const material = {
    materialName: req.body.materialName,
    type: req.body.type,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price    
  };
  const response = await mongodb.getDb().db().collection('materials').insertOne(material);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the material.');
  }
};

const updateMaterial = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const material = {
    materialName: req.body.materialName,
    type: req.body.type,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price 
  };
  const response = await mongodb.getDb().db().collection('materials').replaceOne({ _id: userId }, material);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the material.');
  }
};

const deleteMaterial = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('materials').deleteOne({ _id: userId });
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the material.');
  }
};

module.exports = { getAll, getSingle, createMaterial, updateMaterial, deleteMaterial };