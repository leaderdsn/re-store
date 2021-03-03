import React, { Component } from "react";
import BookListItem from '../book-list-item';
import { connect } from "react-redux";
import { withBookstoreService }  from '../hoc/withBookstoreService'
import { fetchBooks, bookAddedToCart } from "../../actions";
import { bindActionCreators } from "redux";
import { compose } from "../../utils";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import './book-list-container.css'

const BookList = ({ books, onAddedToCart }) => {
    return (
        <ul className='book-list'>
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem 
                                onAddedToCart={() => onAddedToCart(book.id)}
                                book={book} />
                        </li>
                    );
                })
            }
        </ul>
    )
}

class BookListContainer extends Component {

    componentDidMount(){
        this.props.fetchBooks();   
    }

    render () {
        const { books, loading, error, onAddedToCart } = this.props;

        if (loading) {
            return <Spinner />
        }
        if (error) {
            return <ErrorIndicator />
        }

        return <BookList books={books} onAddedToCart={onAddedToCart} />
    };
};

//Нужна для того чтобы books передать в state
const mapStateToProps = ( {bookList: { books, loading, error }} ) => {
    return { books, loading, error };
};

const mapDispatchToProps = (dispatch,  { bookstoreService } ) => {
    //ownProps - получает все свойства от вышестоящих компонентов
    // const { bookstoreService } = ownProps;

    //без использования thunk
    // return {
    //     fetchBooks: fetchBooks(bookstoreService, dispatch), 
    //     onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    // }
    
    // с использование thunk
    return bindActionCreators({
        fetchBooks: () => dispatch(fetchBooks(bookstoreService)()), 
        onAddedToCart: bookAddedToCart
    }, dispatch);
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
    )(BookListContainer);