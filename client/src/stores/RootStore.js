import { runInAction } from "mobx";
import LibraryStore from "./LibraryStore";

const drop = (parentObj, e, id) => {
    const bookId = e.dataTransfer.getData("text");
    const bookObj = parentObj.rootStore.bookStore.data.filter(
        (dataObj) => dataObj._id === bookId
    )[0];

    const newData = parentObj.data.map(async (dataObj) => {
        if (dataObj._id === id) {
            dataObj.books_borrowed.push(bookObj);
            await parentObj.putItem(dataObj, id);
        }
        return dataObj;
    });
    runInAction(async () => {
        await parentObj.rootStore.bookStore.dropHandler(id, bookId);
        await parentObj.fetchItems();
    });
};
const drag = (parentObj, e, id) => {
    const selectedObj = parentObj.data.filter(
        (dataObj) => dataObj._id === id
    )[0];
    e.dataTransfer.setData("text", selectedObj._id);
};
const deleteBorrowed = async (parentObj, userId, bookId) => {
    const selectedObj = parentObj.data.filter(
        (dataObj) => dataObj._id === userId
    )[0];
    const selectedBookObj = selectedObj.books_borrowed.filter(
        (bookObj) => bookObj._id !== bookId
    );
    selectedObj.books_borrowed = selectedBookObj;
    await parentObj.putItem(selectedObj, userId);

    runInAction(async () => {
        await parentObj.rootStore.bookStore.dropHandler(userId, bookId);
        await parentObj.fetchItems();
    });
};
const toggleAvailable = async (parentObj, userId, bookId) => {
    const selectedObj = parentObj.data.filter(
        (dataObj) => dataObj._id === bookId
    )[0];
    selectedObj.available = !selectedObj.available;
    await parentObj.putItem(selectedObj, selectedObj._id);
    runInAction(async () => {
        await parentObj.fetchItems();
    });
};

class RootStore {
    constructor() {
        this.bookStore = new LibraryStore(this, true, {
            dragDropHandler: drag,
            dropHandler: toggleAvailable,
        });
        this.userStore = new LibraryStore(this, false, {
            dragDropHandler: drop,
            dropHandler: deleteBorrowed,
        });
    }
}

export default RootStore;
