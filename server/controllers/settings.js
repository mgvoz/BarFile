import mongoose from 'mongoose';
import Setting from '../models/setting.js';

export const getSettings = async (req, res) => {
	try {
		const settings = await Setting.find();
		res.status(200).json(settings);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getOneSetting = async (req, res) => {
	const { id } = req.params;
	try {
		const setting = await Setting.findById(id);
		res.status(200).json(setting);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createSettings = async (req, res) => {
	const setting = req.body.settingData;
	const newSetting = new Setting({ ...setting });
	try {
		await newSetting.save();
		res.status(201).json(newSetting);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const editSettings = async (req, res) => {
	const { id } = req.params;
	const {
		nameOfUser,
		creator,
		createdAt,
		distributers,
		threshold,
		categories,
	} = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No rubric with id: ${id}`);

	const updatedSetting = {
		nameOfUser,
		creator,
		createdAt,
		distributers,
		threshold,
		categories,
		_id: id,
	};
	await Setting.findByIdAndUpdate(id, updatedSetting, { new: true });
	res.json(updatedSetting);
};

export const deleteSetting = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No setting with id: ${id}`);

	await Setting.findByIdAndRemove(id);

	res.json({ message: 'Setting deleted successfully.' });
};
