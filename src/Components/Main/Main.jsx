import Preloader from "../Preloader/Preloader";
import Card from "../Card/Card";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

let Main = ({countLoadMore, loadMore}) => {
    const books = useSelector(state => state.repos.books),
        isFetching = useSelector(state => state.repos.isFetching),
        totalBooks = useSelector(state => state.repos.totalBooks);

    return isFetching ? <Preloader/>
        : <div  className="container my-container">
            <div style={{margin: "0 auto"}}>{totalBooks > 0 ? <div className="total">
                    <h3>Total books found: {totalBooks}</h3>
                    <h4>Books per page: {countLoadMore * 30}</h4>
                </div>
                : ""}</div>
            <div className="container my-container">
                {books.map((book) => {
                    return (
                        <Link key={Math.random() * 100} className="nav-link my-link" to={`/${book.id}`}>
                            <Card img={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null}
                                  title={book.volumeInfo.title}
                                  category={book.volumeInfo.categories}
                                  authors={book.volumeInfo.authors}/>
                        </Link>
                    )
                })}
            </div>
            {books.length > 0 ?
                <button onClick={loadMore} type="button"
                        className={isFetching ? "disabled btn btn-outline-secondary load-button" : "btn btn-outline-secondary load-button"}>Load
                    More</button>
                : ""}
        </div>

}

export default Main;