import { Product, Order, Supplier, SalesData, CartItem } from '../types';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_SUPPLIERS, MOCK_SALES_DATA } from '../constants';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const getFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

const setToStorage = <T>(key: string, value: T) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
    }
};


// Initialize storage with mock data if it's empty
const initializeData = () => {
    if (!localStorage.getItem('products')) {
        setToStorage('products', MOCK_PRODUCTS);
    }
    if (!localStorage.getItem('orders')) {
        setToStorage('orders', MOCK_ORDERS);
    }
    if (!localStorage.getItem('suppliers')) {
        setToStorage('suppliers', MOCK_SUPPLIERS);
    }
    if (!localStorage.getItem('salesData')) {
        setToStorage('salesData', MOCK_SALES_DATA);
    }
};

initializeData();

// --- Products ---
export const getProducts = async (): Promise<Product[]> => {
    await delay(500);
    return getFromStorage<Product[]>('products', []);
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    await delay(500);
    const products = getFromStorage<Product[]>('products', []);
    const newProduct: Product = {
        ...productData,
        id: Math.max(0, ...products.map(p => p.id)) + 1,
    };
    const updatedProducts = [...products, newProduct];
    setToStorage('products', updatedProducts);
    return newProduct;
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
    await delay(500);
    let products = getFromStorage<Product[]>('products', []);
    const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setToStorage('products', updatedProducts);
    return updatedProduct;
};

export const deleteProduct = async (productId: number): Promise<void> => {
    await delay(500);
    const products = getFromStorage<Product[]>('products', []);
    const updatedProducts = products.filter(p => p.id !== productId);
    setToStorage('products', updatedProducts);
};

// --- Orders ---
export const getOrders = async (): Promise<Order[]> => {
    await delay(500);
    return getFromStorage<Order[]>('orders', []);
};

export const addOrder = async (customerName: string, items: CartItem[]): Promise<Order> => {
    await delay(1000);
    const orders = getFromStorage<Order[]>('orders', []);
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    
    const newOrder: Order = {
        id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
        customerName,
        date: new Date().toISOString().split('T')[0],
        total,
        status: 'Pending',
        items,
    };

    const updatedOrders = [newOrder, ...orders];
    setToStorage('orders', updatedOrders);

    // Update product stock
    let products = await getProducts();
    for (const item of items) {
        const product = products.find(p => p.id === item.product.id);
        if (product) {
            const updatedStockProduct = { ...product, stock: product.stock - item.quantity };
            await updateProduct(updatedStockProduct);
        }
    }

    return newOrder;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order> => {
    await delay(500);
    const orders = getFromStorage<Order[]>('orders', []);
    let updatedOrder: Order | undefined;
    const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
            updatedOrder = { ...order, status };
            return updatedOrder;
        }
        return order;
    });
    setToStorage('orders', updatedOrders);
    if (!updatedOrder) throw new Error("Order not found");
    return updatedOrder;
};

// --- Suppliers ---
export const getSuppliers = async (): Promise<Supplier[]> => {
    await delay(500);
    return getFromStorage<Supplier[]>('suppliers', []);
};

// --- Sales Data ---
export const getSalesData = async (): Promise<SalesData[]> => {
    await delay(500);
    return getFromStorage<SalesData[]>('salesData', []);
};
