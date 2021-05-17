import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
	nameOfUser: { type: String, default: '' },
	creator: { type: String, default: '' },
	createdAt: { type: Date, default: new Date() },
	distributers: { type: Array, default: [] },
	threshold: { type: String, default: 0 },
	categories: { type: Array, default: [] },
});

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
