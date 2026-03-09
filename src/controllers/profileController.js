const Profile = require('../models/profile');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

exports.index = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user');

    if (!profiles) {
      return res.status(404).json({ message: 'Nenhum perfil encontrado' });
    }

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user');

    if (!profile) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.store = async (req, res) => {
  try {
    const profile = await Profile.create({
      _id: uuidv4(),
      user_id: req.body.user_id,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
      occupation: req.body.occupation,
    });

    if (!profile) {
      return res.status(400).json({ message: 'Perfil não criado' });
    }

    await User.findByIdAndUpdate(req.body.user_id || req.body.user, { profile: profile._id });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, {
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
      occupation: req.body.occupation,
    }, { new: true });

    if (!profile) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }

    res.status(200).json({ message: 'Perfil deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};