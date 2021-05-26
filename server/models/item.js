import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
	nameOfUser: { type: String, default: '' },
	creator: { type: String, default: '' },
	lastUpdated: { type: Date, default: new Date() },
	nameOfItem: { type: String, default: '' },
	distributer: { type: Array, default: '' },
	quantityRemaining: { type: String, default: 0 },
	category: { type: Array, default: '' },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
