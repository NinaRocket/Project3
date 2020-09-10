const db = require("../models");

// Defining methods
// need a create, update, and find route, for warranty and recalls
module.exports = {
    findAll: function(req, res) {
        db.Warranty
          .find({ vehicle: req.body.vehicle })
          .populate("vehicle")
          .then(dbWarranties => res.json(dbWarranties))
          .catch(err => res.status(422).json(err));
      },
    findById: function(req, res) {
      db.Warranty
        .findById(req.body.id)
        .populate("vehicle")
        .then(dbWarranty => res.json(dbWarranty))
        .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
        db.Warranty
          .create(req.body)
          .then(dbWarranty => {
            db.Vehicle.findOneAndUpdate({ _id: req.body.vehicle }, { $push: { warranties: dbWarranty._id }})
            .then(dbVehicle => res.json(dbWarranty));
          })
          .catch(err => res.status(422).json(err));
      },
      update: function(req, res) {
        db.Warranty
          .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
          .then(dbWarranty => res.json(dbWarranty))
          .catch(err => res.status(422).json(err));
      },
      remove: function(req, res) {
        db.Warranty
          .findOneAndDelete({ _id: req.params.id })
          .then(dbWarranty => res.json(dbWarranty))
          .catch(err => res.status(422).json(err));
      }
};