import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method'));
app.use(cookieParser());

//routes
app.use('/user', userRoutes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});
const port = 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
