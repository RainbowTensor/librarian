import "./InfoRow.css";

export default function InfoRow(props) {
    if (props.name === "Books Borrowed") {
        //console.log("info row", props.data);
    }
    return (
        <div className="infoRow">
            <h5>{props.name}</h5>
            {typeof props.data === "string" ? (
                <h5 className="data">{props.data}</h5>
            ) : (
                <div className="booksList">
                    {props.data.map((obj, idx) => (
                        <div className="bookRow" key={idx}>
                            <h6> {obj.name} </h6>
                            <button
                                className="deleteBttn"
                                onClick={(e) =>
                                    props.deleteBorrowedHandler(
                                        e,
                                        props.userId,
                                        obj._id
                                    )
                                }
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
