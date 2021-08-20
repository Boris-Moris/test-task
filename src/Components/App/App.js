// Импорт компонентов
import Select from "../Select/Select";
import Main from "../Main/Main";

//Импорт стилей
import './App.css';

//Импорт функций
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMoreBooks, getNewBooks} from "../../reducers/reposReducer";
import {Route, Switch, useHistory} from "react-router-dom";
import BookPage from "../BookPage/BookPage";

let App = () => {
    const dispatch = useDispatch(),
        isFetching = useSelector(state => state.repos.isFetching),
        apiKey = "AIzaSyBPJHT-X3mYIw2w-blg-jPhk397iUN4N1Q",
        history = useHistory();

    let [book, setBook] = useState(""),
        [prevBook, setPrevBook] = useState(""), //повторные переменные введены для сравнения изменений содержимого
        [category, setCategory] = useState("All"),
        [prevCategory, setPrevCategory] = useState("All"),
        [type, setType] = useState("relevance"),
        [prevType, setPrevType] = useState("relevance"),
        [countLoadMore, setCountLoadMore] = useState(0), // это сделано для пагинации, чтобы подсчитывать
        // с какого индекса книги начать загрузку следующей части книг
        input = useRef();

    let handleSubmit = (e) => {
        e.preventDefault();
        if (!input.current.value) return;
        history.push("/");
        if (book !== prevBook || category !== prevCategory || type !== prevType) { //проверяем, изменилось ли что-то в параметрах поиска
            setPrevBook(book);
            setPrevCategory(category);
            setPrevType(type);
            setCountLoadMore(countLoadMore = 0);
            dispatch(getNewBooks(book, category, apiKey, countLoadMore, type));
            setCountLoadMore(countLoadMore + 1);
        }
    };

    let handleChange = (e) => {
        const book = e.target.value;
        setBook(book);
    };

    let loadMore = () => {
        setCountLoadMore(countLoadMore + 1);
        dispatch(getMoreBooks(book, category, apiKey, countLoadMore, type));
    }

    let optionsValue = [["All", "Art", "Biography", "Computers", "History", "Medical", "Poetry"], ["relevance", "newest"]];

    return (
            <div className="container">
                <h1>Book search Application</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            ref={input}
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            placeholder="Search for Books"
                            autoComplete="off"
                        />
                    </div>

                    <p>Categories: <Select onChange={setCategory} options={optionsValue[0]} value={category}/></p>

                    <p>Type: <Select onChange={setType} options={optionsValue[1]} value={type}/></p>

                    <button type="submit"
                            className={isFetching ? "disabled btn btn-outline-success" : "btn btn-outline-success"}>
                        Search
                    </button>
                </form>


                <Switch>

                    <Route exact path="/" render={props => <Main countLoadMore={countLoadMore} loadMore={loadMore}/>}/>
                    <Route path="/:bookId" component={BookPage}/>

                </Switch>

            </div>
    );
};

export default App;
