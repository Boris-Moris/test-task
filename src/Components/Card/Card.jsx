import "./Card.css";

let Card = ({img, title, category, authors}) => {
    // Если есть несколько категорий, то отобразить только одну
    return (
            <div  className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={img ? img : null} className="img-fluid rounded-start" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{category ? category[0] : ""}</p>
                            {authors ?
                                authors.map(item => <p key={Math.random() * 100} className="card-text" style={{display: "inline-block"}}><small
                                    className="text-muted">{authors.length > 1 ? `${item}, ` : item}</small></p>)
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Card;