import React from "react";
import { observer } from "mobx-react";
import BookCard from "../Card/BookCard";
import UserCard from "../Card/UserCard";
import AddWindow from "../AddWindow/AddWindow";

import "./Window.css";

class Window extends React.Component {
    onAddEventHandler = (e) => {
        this.props.store.toggleAddWindow();
    };
    editEventHandler = (e, id) => {
        this.props.store.toggleAddWindow();
        this.props.store.setEditData(id);
    };
    deleteEventHandler = (e, id) => {
        this.props.store.deleteItem(id);
    };
    dragEventHandler = (e, id) => {
        e.dataTransfer.setData("text", id);
    };
    dropEventHandler = (e, id) => {
        e.preventDefault();
        this.props.store.dragDropHandler(e, id);
    };
    deleteBorrowedHandler = (e, userId, bookId) => {
        this.props.store.dropHandler(userId, bookId);
    };
    render() {
        const data = this.props.store.data;
        const isBook = this.props.store.isBook;
        const viewAddWindow = this.props.store.viewAddWindow;

        return (
            <div className="windowWrapper">
                <h3>{isBook ? "Books" : "Users"}</h3>
                {data.map((dataObj, idx) => {
                    if (isBook) {
                        return (
                            <BookCard
                                data={dataObj}
                                key={idx}
                                editEventHandler={this.editEventHandler}
                                deleteEventHandler={this.deleteEventHandler}
                                onDragStart={this.dragEventHandler}
                            />
                        );
                    }
                    return (
                        <UserCard
                            data={dataObj}
                            key={idx}
                            editEventHandler={this.editEventHandler}
                            deleteEventHandler={this.deleteEventHandler}
                            deleteBorrowedHandler={this.deleteBorrowedHandler}
                            onDrop={this.dropEventHandler}
                        />
                    );
                })}
                <button className="addButton" onClick={this.onAddEventHandler}>
                    Add
                </button>
                {viewAddWindow && <AddWindow store={this.props.store} />}
            </div>
        );
    }
}

export default observer(Window);
