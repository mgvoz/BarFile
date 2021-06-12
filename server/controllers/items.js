import mongoose from 'mongoose';
import Item from '../models/item.js';

export const getItems = async (req, res) => {
	try {
		const items = await Item.find();
		res.status(200).json(items);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getOneItem = async (req, res) => {
	const { id } = req.params;
	try {
		const item = await Item.findById(id);
		res.status(200).json(item);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const saveItem = async (req, res) => {
	const item = req.body.itemData;
	const newItem = new Item({ ...item });
	try {
		await newItem.save();
		res.status(201).json(newItem);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const editItem = async (req, res) => {
	const { id } = req.params;
	const {
		nameOfUser,
		creator,
		lastUpdated,
		nameOfItem,
		distributer,
		quantityRemaining,
		category,
		barcode,
	} = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No item with id: ${id}`);

	const updatedItem = {
		nameOfUser,
		creator,
		lastUpdated,
		nameOfItem,
		distributer,
		quantityRemaining,
		category,
		barcode,
		_id: id,
	};
	await Item.findByIdAndUpdate(id, updatedItem, { new: true });
	res.json(updatedItem);
};

export const deleteItem = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No item with id: ${id}`);

	await Item.findByIdAndRemove(id);

	res.json({ message: 'Item deleted successfully.' });
};
