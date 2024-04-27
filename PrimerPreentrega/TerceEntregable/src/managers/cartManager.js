import fs from 'fs';

let carts = [];
const pathFile = './src/data/carts.json'

const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile);
    carts = JSON.parse(cartsJson) || [];

    return carts;
}

const createCart = async () => {
    await getCarts();

    const newCart = {
        id: carts.length + 1,
        products: []
    };

    carts.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(newCart));

    return newCart;
}


const getCartById = async (cid) => {
    await getCarts();

    const cart = carts.find(c => c.id === cid);

    if (!cart) return `No se encuentra el carrito con el id ${cid}`
    
    return cart.products;
}


// const addProductToCart = async (cid, pid) => {
    
//     await getProducts();

//     const index = carts.findIndex(c => c.id === cid);
//     if (index === -1) return `No se encontro el carrito con el id ${cid}`;
    
//     carts[index].products.push({
//         product: pid,
//         quantiti: 1
//     });

//     return carts[index]
// }


const addProductToCart = async (cid, pid) => {
    await getProducts();

    const index = carts.findIndex(c => c.id === cid);
    if (index === -1) return `No se encontró el carrito con el ID ${cid}`;
    
    const cart = carts[index];
    const existingProductIndex = cart.products.findIndex(p => p.product === pid);

    if (existingProductIndex !== -1) {
        
        cart.products[existingProductIndex].quantity++;
    } else {
        
        cart.products.push({
            product: pid,
            quantity: 1
        });
    }

    return cart;
}



export default {
    getCarts,
    createCart,
    getCartById,
    addProductToCart,
}
