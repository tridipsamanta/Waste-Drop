import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRouter);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
