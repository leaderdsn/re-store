import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { compose } from 'redux';
import reducer from './reducers';

//* Использование Middleware *//
//next это тотже dispatch
//деструктурируем store, берём из него getState
const logMiddleware = ({getState})  => (next) => (action) => {
    console.log(action.type, getState());
    return next(action);
}

const stringMiddleware = ()  => (next) => (action) => {
    if (typeof action === 'string') {
    return next({
        type: action
    });
    }

    return next(action);
}

//* Использование Enhancer *//

// const logEnchancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         console.log(action.type);
//         return originalDispatch(action);
//     };

//     return store;
// };

// const stringEnchancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {

//         if (typeof action === 'string') {
//         return originalDispatch({
//             type: action
//         });
//         }

//         return originalDispatch(action);
//     };

//     return store;
// };

// const store = createStore(reducer, compose(
//     stringEnchancer,
//     logEnchancer));

const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));

const delayActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), timeout)

}

store.dispatch(delayActionCreator(3000));

store.dispatch('HELLO_WORLD');

export default store;