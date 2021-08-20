import {Link, withRouter} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBook} from "../../reducers/reposReducer";
import Preloader from "../Preloader/Preloader";

let BookPage = ({match, history}) => {
    const dispatch = useDispatch(),
        book = useSelector(state => state.repos.book),
        error = useSelector(state => state.repos.isFetchError),
        isFetching = useSelector(state => state.repos.isFetching),
        apiKey = "AIzaSyBPJHT-X3mYIw2w-blg-jPhk397iUN4N1Q";

    let bookId = match.params.bookId;

    useEffect(() => {
        dispatch(getBook(bookId, apiKey));
    }, [bookId, dispatch]);

    //если ни один результат не готов
    if (!error && Object.keys(book).length === 0) return <Preloader/>;

    // если вышла ошибка
    if (!isFetching && error) return (
        <>
            <Link to="" onClick={() => history.goBack()}><span className="material-icons">
        reply
      </span></Link>
            <div className="alert alert-danger" role="alert">
                Произошла ошибка! Пожалуйста, попробуйте снова позже!
            </div>
        </>
    );

    // если получили OK
    if (!isFetching && Object.keys(book).length > 0) return <div className="card mb-3" style={{margin: "0 auto"}}>
        <Link to="" onClick={() => history.goBack()}><span className="material-icons">
        reply
      </span></Link>
        <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null}
             className="card-img-top" alt=""/>
        <div className="card-body">
            <h5 className="card-title">{book.volumeInfo.title}</h5>
            <p className="card-text"><small
                className="text-muted">
                {book.volumeInfo.category ? book.volumeInfo.category.map(item =>
                    <span>Categories: {item}</span>) : ""}
            </small></p>
            <h5 className="card-text"><small className="text-muted"><b>Authors:</b> {book.volumeInfo.authors}</small>
            </h5>
            <p className="card-text">{book.volumeInfo.description}</p>
        </div>
    </div>
}

export default withRouter(BookPage);