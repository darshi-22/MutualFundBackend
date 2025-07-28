const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fundRoutes = require('./routes/fundRoutes');
require('./cronJobs/syncFundsCron'); 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/funds', fundRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
