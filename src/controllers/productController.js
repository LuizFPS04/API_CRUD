// Controller para Criação de Produtos;

const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'products.json');

const getProducts = () => {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

    try {
        return JSON.parse(data);
    }catch (error) {
        return [];
    }
};

const saveProduct = (products) => fs.writeFileSync(filePath,  JSON.stringify(products, null, '\t'));

class ProductController {
    showAllProducts (req, res) {
        const products = getProducts();

        res.send({ products });
    };

    createProduct (req, res) {
        const products = getProducts();

        const { id, name, price } = req.body;
        if (!id) return res.status(400).send({ error: 'O ID é OBRIGATÓRIO!' });
        else if(!name) return res.status(400).send({ error: 'O nome do produto é OBRIGATÓRIO!' });
        else if (!price) return res.status(400).send({ error: 'O preço do produto é OBRIGATÓRIA!' });

        products.push(req.body);
        saveProduct(products);

        res.status(201).send('Produto cadastrado com sucesso!');
    };

    updateProduct (req, res) {
        const products = getProducts();

        saveProduct(products.map(product => {
            if (product.id === req.params.id) {
                return {
                    ...product,
                    ...req.body
                };
            };
            return product;
        }));
        res.status(200).send('Produto atualizado com sucesso!');
    };

    deleteProduct(req, res) {
        const products = getProducts();

        saveProduct(products.filter(product => product.id !== req.query.id));

        res.status(200).send('Produto deletado com sucesso!');
    };
};

module.exports = new ProductController();