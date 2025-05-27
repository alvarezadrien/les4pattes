import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:5173', 'https://training-react-basics.onrender.com', 'https://takt.konfer.be'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

export default cors(corsOptions);