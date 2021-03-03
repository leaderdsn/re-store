const updateCartItems = (cartItems, item, idx) => {

    //если индекс равен -1 тогда создаём новый item
    if (idx === -1) {
        return [
            ...cartItems,
            item
        ];
    }
    //если индекс равен 0 тогда удаляем item
    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ];
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ];
};

const updateCartItem = (book, item = {}, quantity) => {

    const {
        id = book.id,
            count = 0,
            title = book.title,
            total = 0
    } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    };
};
//Обновление состояния корзины
const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems, orderTotal } } = state;
    const book = books.find(({ id }) => id === bookId);
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
    const item = cartItems[itemIndex];
    const newItem = updateCartItem(book, item, quantity);
    return {
        orderTotal: orderTotal,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };
};

const updateTotal = (state, bookId, quantity) => {
    let totalAll = updateOrder(state, bookId, quantity);
    let curTotal = 0;
    totalAll.cartItems.forEach(item => {
        curTotal += item.total;
    });
    totalAll.orderTotal = curTotal;
    return totalAll;
};

const updateShoppingCart = (state, action) => {
    if (state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0
        };
    }
    switch (action.type) {
        case 'BOOK_ADDED_TO_CART':
            return updateTotal(state, action.payload, 1)
        case 'BOOK_REMOVED_FROM_CART':
            return updateTotal(state, action.payload, -1)
        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.shoppingCart.cartItems.find(({ id }) => id === action.payload);
            return updateTotal(state, action.payload, -item.count)
        default:
            return state.shoppingCart;
    }
};

export default updateShoppingCart;