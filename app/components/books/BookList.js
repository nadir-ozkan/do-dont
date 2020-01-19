import React from 'react';
import utils from '../../Utils/utils.js';

const BookItem = (props) => {
    const {SpanStyle, RowStyle} = Styles;
    return(
        <div style={RowStyle}>
            <span style={SpanStyle}>{props.bookName}</span>
            <span style={SpanStyle}>{props.authorName}</span>
            <span style={SpanStyle}>{props.isbn}</span>
            <button onClick={props.onDelete}>Sil</button>
        </div>
    );
}

class BookList extends React.Component {
    constructor(props){
        super(props);
    }

    handleAddNewClick() {
        if (this.props.onAddNew){
            this.props.onAddNew();
        }
    }

    onDelete(id) {
        if(this.props.onDelete){
            this.props.onDelete(id);
        }
    }

    renderList(){
        if (this.props.books){
            return this.props.books.map((book) => {
                return (
                    <BookItem
                        key={book.id}
                        {...book}
                        onDelete={this.onDelete.bind(this, book.id)}
                    />
                );
            });
        } else {
            return null;
        }
    }

    render(){
        return (
            <div>
                <div>
                    <button onClick={this.handleAddNewClick.bind(this)}>Yeni Kitap ekle</button>
                </div>
                <div>
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const Styles = {
    SpanStyle : {
        flex : 1,
        paddingLeft : "5px",
        display : "inline-block"
    },
    RowStyle : {
        display : "flex",
        color :"grey",
        margin : "5px 0",
        padding : "0 5px"
    }
}


export default BookList;
