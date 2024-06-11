import express from 'express';
import data from './data.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find((x) => x.slug === req.params.slug);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

//users api
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});