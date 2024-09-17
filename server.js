import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from './models/userSchema.js';
import Order from './models/orderSchema.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const router = express.Router();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB', error);
});

app.get('/', async (req, res) => {
  try {
    const shoes = await mongoose.connection.db.collection('shoes').find({}).toArray();
    const cartItems = await mongoose.connection.db.collection('cart').find({}).toArray();
    const responseData = {
      shoes: [...shoes],
      cart: [...cartItems]
    };
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching data from MongoDB', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/login',async (req,res)=>{
  try {
    const email = req.query.email; 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }
    res.json(user); 
  } catch (err) {
    console.error('Ошибка при поиске пользователя:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким именем пользователя или адресом электронной почты уже существует' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован'});
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации пользователя' });
  }
});

router.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Неправильный пароль' });
    }

    const token = jwt.sign({ userId: user._id }, 'my_secret_key');
    res.status(200).json({ token , message: 'пользователь авторизирован'});
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера при входе пользователя' });
  }
});

router.post('/api/Orders', async (req, res) => {
  try {
    const existingOrder = await Order.findOne({ email: req.body.email });
  
    if (existingOrder) {
      if (!Array.isArray(existingOrder.orders)) {
        existingOrder.orders = [existingOrder.orders]; 
      }
      existingOrder.orders.push(req.body.order); 
      await existingOrder.save();
      res.status(200).json({ message: 'Заказ успешно обновлен' });
    } else {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json({ message: 'Заказ успешно создан' });
    }
  } catch (error) {
    console.error('Ошибка при создании/обновлении заказа:', error);
    res.status(500).json({ message: 'Ошибка сервера при создании/обновлении заказа' });
  }
});

router.post('/api/cart', async (req, res) => {
  try {
    const { _id, name, count } = req.body;
    const CartProductCollection = mongoose.connection.collection('cart');
    const existingItem = await CartProductCollection.findOne({ _id });
    if (existingItem) {
      await CartProductCollection.updateOne({ _id }, { $set: { count: existingItem.count + 1 } });
    } else {
      await CartProductCollection.insertOne({ _id, name, count: 1 });
    }
    const cart = await CartProductCollection.find({}).toArray();
    res.json(cart);
  } catch (error) {
    console.error('Ошибка при добавлении элемента:', error);
    res.status(500).send('Ошибка сервера');
  }
});

app.use(router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
