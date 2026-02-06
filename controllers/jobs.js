const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('jobs').find();
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
    .collection('jobs')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createJobs = async (req, res) => {
  const jobs = {
    location_id: req.body.location_id,
    location: req.body.location,
    material_id: req.body.material_id,
    materialName: req.body.materialName
  };
  const response = await mongodb.getDb().db().collection('jobs').insertOne(jobs);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the jobs.');
  }
};

const updateJobs = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const jobs = {
    location_id: req.body.location_id,
    location: req.body.location,
    material_id: req.body.material_id,
    materialName: req.body.materialNamey
  };
  const response = await mongodb.getDb().db().collection('jobs').replaceOne({ _id: userId }, jobs);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the jobs.');
  }
};

const deleteJobs = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('jobs').deleteOne({ _id: userId });
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the jobs.');
  }
};

module.exports = { getAll, getSingle, createJobs, updateJobs, deleteJobs };