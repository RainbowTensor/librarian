import React from "react";
import Card from "./Card/Card";
import InfoRow from "../InfoRow/InfoRow";

function UserCard(props) {
    const data = props.data;
    return (
        <div
            onDrop={(e) => props.onDrop(e, data._id)}
            onDragOver={(e) => e.preventDefault()}
        >
            <Card>
                <div className="title">
                    {`${data.first_name} ${data.last_name}`}
                </div>
                <div className="info">
                    <InfoRow name="Date of Birth" data={data.date_of_birth} />
                    <InfoRow
                        name="Books Borrowed"
                        data={data.books_borrowed}
                        userId={data._id}
                        deleteBorrowedHandler={props.deleteBorrowedHandler}
                    />
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

export default UserCard;
