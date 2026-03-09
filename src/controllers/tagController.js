const Tag = require('../models/tag');
const { v4: uuidv4 } = require('uuid');

exports.index = async (req, res) => {
  try {
    const tags = await Tag.find();

    if (!tags) {
      return res.status(404).json({ message: 'Nenhuma tag encontrada' });
    }

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag não encontrada' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.store = async (req, res) => {
  try {
    const tag = await Tag.create({
      _id: uuidv4(),
      name: req.body.name,
    });
    if (!tag) {
      return res.status(400).json({ message: 'Tag não criada' });
    }
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    }, { new: true });
    if (!tag) {
      return res.status(404).json({ message: 'Tag não encontrada' });
    }
    res.status(200).json(tag);
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag não encontrada' });
    }
    res.status(200).json({ message: 'Tag deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};