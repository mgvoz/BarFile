import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import methodOverride from 'method-override';
import userRoutes from './routes/users.js';
import settingRoutes from './routes/settings.js';
import CONNECTION_URL from './config.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method'));
app.use(cookieParser());

//routes
app.use('/users', userRoutes);
app.use('/settings', settingRoutes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const url = CONNECTION_URL;
const port = 5000;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(port, () => console.log(`Server running on port: ${port}`)),
	)
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
