import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
	nameOfUser: { type: String, default: '' },
	creator: { type: String, default: '' },
	lastUpdated: { type: Date, default: new Date() },
	nameOfItem: { type: String, default: '' },
	barcode: { type: String, default: '' },
	distributer: { type: String, default: '' },
	quantityRemaining: { type: String, default: '' },
	category: { type: String, default: '' },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
