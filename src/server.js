import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors'; // Allows cross-origin requests
import helmet from 'helmet'; // Configures HTTP-Headers for protection
import { json } from 'body-parser'; // Parses incoming requests with JSON payloads

import routes from './routes/routes';

const app = express();
app.listen(process.env.PORT || 3000);
app.get('/', (req, res) => res.send('API Server running!'));

// // Connecting to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
//   .then(() => {
//     const app = express();

//     app.use(cors());
//     app.use(helmet());
//     app.use(json());

//     // ! Sicherheitslücke
//     // // Makes uploads accessible
//     // app.use(express.static('uploads'));

//     // Forwards to Routes
//     app.use('/test', (req, res) => res.send('API Server running!'));
//     app.use('/api', routes);

//     app.listen(process.env.SERVER_URL, () => {
//       console.log('\nServer running on http://localhost:' + process.env.SERVER_URL);
//     });
//   })
//   .catch((err) => console.log('\nMongoDB could not be connected - ' + err));