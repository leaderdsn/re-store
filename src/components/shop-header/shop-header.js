import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './shop-header.css';

const ShopHeader = ({numItems, total}) => {
    return (
        <header className="shop-header">
            <Link to='/'>
                <div className="logo text-dark">ReStore</div>
            </Link>
            <Link to='/cart'>
                <div className="shopping-cart">
                    <i className="cart-icon fa fa-shopping-cart" />
                    {numItems} items (${total})
                </div>
            </Link>
        </header>
    )
};

const mapStateToProps = ({shoppingCart: {cartItems, orderTotal}}) => {
    let curItem = 0;
    cartItems.forEach((item) => {
        console.log(item.count)
        curItem = item.count
    })

    return {
        numItems: curItem,
        total: orderTotal
    }
};

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);