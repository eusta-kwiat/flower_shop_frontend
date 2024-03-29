const sampleProduct = {
    id: 1,
    name: "blabla",
    description: "bljhdfgkajsdf",
    price: 15.99,
    img: '/url',
    discounted: 12.99 // albo null
}

const cart = [
    {product: {
        id: 5,
        name: 'asd',
        description: 'asdfasdfas',
        price: 15.99,
        discounted: 12.99
    },
    quantity: 5},
]

export const initializeCart = () => {
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
}

export const addToCart = (product, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        if (quantity > 0){
            cart.push({product: product, quantity: quantity});
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const removeItem = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingItemIndex = cart.findIndex(item => item.product. id === product.id);
    if (existingItemIndex >= 0 && existingItemIndex < cart.length) {
        cart.splice(existingItemIndex, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const getTotalPrice = (cart) => {
    if (!cart)
        return 0;
    let totalPrice = 0;
    cart.forEach(item => {
        const productPrice = parseFloat(item.product.price);
        totalPrice += productPrice * item.quantity;
    })
    return totalPrice;
}

export const transformCartToOrder = (cart) => {
    return cart.map(item => ({
        id: item.product.product_id,
        quantity: item.quantity,
    }));
}
