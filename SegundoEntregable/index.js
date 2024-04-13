const fs = require('fs'); 

let products = [];
let pathFile = './data/products.json';

const addProduct = async (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
        id : products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }

if (Object.values(newProduct).includes(undefined)) {
    console.log(`No se agrego el ${title} por falta de datos`)
    return;
}

const productExist = products.find(product => product.code === code);
if (productExist){
    console.log(`El producto ${title} con el codigo ${code} ya existe`);
    return;
}

products.push(newProduct);

await fs.promises.writeFile(pathFile, JSON.stringify(products));

};


const getProducts = async () => {
    const productsJson = await fs.promises.readFile(pathFile,'utf8');
    products = JSON.parse(productsJson) || [];
    return products;

};


const getProductById = async (id) => {
    await getProducts();

    const product = products.find( product => product.id === id);
    if (!product){
        console.log(`No se encontró el producto con el id ${id}`);
        return;
    }
    console.log(product);
    return product;
}


const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const index = products.findIndex( product => product.id === id);
    products[index] = {
        ...products[index],
        ...dataProduct
    }
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}


const deleteProduct = async (id) => {
    await getProducts();
    products = products.filter(product => product.id !== id);

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

//Test

// addProduct('Producto 1', 'Es el primer producto', '2000', 'Sin Imagen', 'ABC1', '10')
// addProduct('Producto 2', 'Es el segundo producto', '5000', 'Sin Imagen', 'ABC2', '10')
// addProduct('Producto 3', 'Es el tercer producto', '1000', 'Sin Imagen', 'ABC2', '10')
// addProduct('Producto 4', 'Es el cuarto producto', '500', 'Sin Imagen', 'ABC3', '10')
// addProduct('Producto 5', 'Es el quinto producto', '1500', 'Sin Imagen', 'ABC4')

// console.log('A continuación aparecerá el listado de todos los productos que tenemos registrados')
// console.log('*********************************************************************************')
// getProducts();

// console.log('A continuación aparecerá el producto con el id especifico ingresado')
// console.log('********************************************************************')

// Ingrese el id del producto que desea encontrar
// getProductById(2)

// Ingrese el id del producto que desea editar 

// updateProduct(3, {
//     title: "Producto 3",
//     description: "Es el tercer producto",
// }); 

// Ingresa el id del producto que desea eliminar 

deleteProduct(2);
