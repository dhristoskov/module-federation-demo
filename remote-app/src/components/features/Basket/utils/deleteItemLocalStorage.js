const deleteItemLocalStorage = (id) => {
    const basket = JSON.parse(localStorage.getItem('basket'));
    if(!basket) return;
    const productIndex = basket.products.findIndex((p) => p.id === id);
    const productToDelete = basket.products[productIndex];
    const oldTotalPrice = parseFloat(basket.totalPrice);
    const newTotalPrice = (oldTotalPrice - productToDelete.price).toFixed(2);
    localStorage.setItem('basket', JSON.stringify({
        ...basket,
        products: [...basket.products.slice(0, productIndex), ...basket.products.slice(productIndex + 1)],
        totalPrice: newTotalPrice
    }));
};

export default deleteItemLocalStorage;