import React from "react";
import Card from "./Card/Card";
import InfoRow from "../InfoRow/InfoRow";

function BookCard(props) {
    const data = props.data;
    const id = props.data.available ? "" : "disabled";
    return (
        <div
            onDragStart={(e) => props.onDragStart(e, data._id)}
            draggable={props.data.available}
        >
            <Card>
                <div className="title" id={id}>
                    {data.name}
                </div>
                <div className="info" id={id}>
                    <InfoRow name="Author" data={data.author} />
                    <button
                        onClick={(e) => props.editEventHandler(e, data._id)}
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => props.deleteEventHandler(e, data._id)}
                    >
                        Delete
                    </button>
                </div>
            </Card>
        </div>
    );
}

export default BookCard;
