require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const postsRouter = require('./routes/posts');

const app = express();

// Connect to DB
connectDB();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'Blog backend running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
