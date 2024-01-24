import axios from 'axios';

const apiURL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json',
      },
})

export const login =  async (email, password) => {
    const userData = {
        email: email,
        password: password
    }
    console.log(userData);

    return await api.post('/api/login/', userData)
    .then(response => {
        console.log(response.data);
        if (response.data.status === 'success'){
            const {refresh, access } = response.data;
            localStorage.setItem('refresh', refresh);
            localStorage.setItem('access', access);
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            throw new Error('Login failed');
        }
    })
    .catch(error => {
        throw error;
    })
}

const mockProducts = [
  { id: 1, name: 'Róza', price: 19.99, img: 'https://picsum.photos/200/300'},
  { id: 2, name: 'Fiołek', price: 29.99, img: 'https://picsum.photos/200/400'},
  { id: 3, name: 'Bukiet urodzinowy', price: 29.99, img: 'https://picsum.photos/200/200' },
  { id: 4, name: 'Bukiet weselny', price: 29.99, img: 'https://picsum.photos/200/250' },
];

export const getProducts = async () => {
    try {
        const response = await api.get('/api/products');
        const apiProducts = response.data;
        const productsWithImg = apiProducts.map((product, index) => ({
            ...product,
            img: `https://picsum.photos/200/250?random=${index + 1}`,
        }));

        return productsWithImg;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const getHeaders = () => {
    const authToken = localStorage.getItem('access');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken,
    };
    return headers;
}

export const getDiscounts = async (cart, discount_code) => {
    const headers = getHeaders();

    const itemsQuantity = cart.map(item => ({
        id: item.product.product_id,
        quantity: item.quantity,
    }));

    const body = {
        discount_code: discount_code,
        products: itemsQuantity
    };

    console.log(body);

    return axios.post(apiURL + 'check_discount/', body , { headers });
}

export const getUserOrders = () => {
    const headers = getHeaders();

    return axios.get(apiURL + 'client/orders/', {headers});
}

export const getOrderDetails = (orderId) => {
    const headers = getHeaders();

    return axios.get(apiURL + 'client/orders/' + orderId + '/', {headers});
}

export const placeOrder = (body) => {
    const headers = getHeaders();

    return axios.post(apiURL + 'place_order/', body, {headers});
};
