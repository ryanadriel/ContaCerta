const Transaction = require('../models/transaction');
const { v4: uuidv4 } = require('uuid');

exports.index = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user').populate('tag');
    if (!transactions) {
      return res.status(404).json({ message: 'Nenhuma transação encontrada' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('user').populate('tag');
    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.store = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      _id: uuidv4(),
      user_id: req.body.user_id,
      tag_id: req.body.tag_id,
      amount: req.body.amount,
      type: req.body.type,
      date: req.body.date,
    });

    if (!transaction) {
      return res.status(400).json({ message: 'Transação não criada' });
    }

    const populated = await Transaction.findById(transaction._id).populate('user').populate('tag');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updateData = {
      amount: req.body.amount,
      type: req.body.type,
      date: req.body.date,
    };
    if (req.body.tag_id) {
      updateData.tag_id = req.body.tag_id;
      updateData.tag = req.body.tag;
    }
    if (req.body.user_id) {
      updateData.user_id = req.body.user_id;
      updateData.user = req.body.user;
    }
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('user').populate('tag');
    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    res.status(200).json({ message: 'Transação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};