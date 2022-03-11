import {
    makeObservable,
    observable,
    action,
    runInAction,
    computed,
    toJS,
} from "mobx";
import LibraryService from "../LibraryService";

class LibraryStore {
    data = [];
    isBook = false;
    collection = "";
    viewAddWindow = false;
    newData = {};
    selectedId = "";
    constructor(rootStore, isBook, methods) {
        makeObservable(this, {
            data: observable,
            viewAddWindow: observable,
            newData: observable,
            toggleAddWindow: action,
            updateData: action,
            setEditData: action,
            setNewData: action,
        });
        this.libraryService = new LibraryService();
        this.rootStore = rootStore;
        this.isBook = isBook;
        this.methods = methods;
        runInAction(() => {
            this.collection = this.isBook ? "books" : "users";
            this.fetchItems();
        });
    }
    async fetchItems() {
        const data = await this.libraryService.get(this.collection);
        runInAction(() => {
            this.data = data;
            this.newData = this.getEmptyDataObj(this.data[0]);
        });
    }
    async putItem(data, id) {
        const res = await this.libraryService.put(this.collection, data, id);
    }
    async postItem(id, data) {
        if (this.selectedId) {
            console.log("put");
            const data = await this.putItem(this.newData, this.selectedId);
        } else {
            console.log("post");
            const newData = await this.libraryService.post(
                this.collection,
                this.newData
            );
        }
        runInAction(async () => {
            this.setNewData();
            await this.fetchItems();
        });
    }
    async deleteItem(id) {
        const selectedObj = this.data.filter(
            (dataObj) => dataObj._id === id
        )[0];
        // if user has books set available o delete
        if (selectedObj.books_borrowed) {
            selectedObj.books_borrowed.forEach((bookObj) => {
                this.dropHandler(id, bookObj._id);
            });
        }
        const res = await this.libraryService.delete(this.collection, id);
        runInAction(async () => {
            await this.fetchItems();
        });
    }
    toggleAddWindow() {
        this.viewAddWindow = !this.viewAddWindow;
    }
    updateData(key, value) {
        this.newData[key] = value;
    }
    setEditData(id) {
        const selectedObj = this.data.filter(
            (dataObj) => dataObj._id === id
        )[0];
        const entries = this.getDataArray(selectedObj);
        const newObj = Object.fromEntries(entries);
        this.newData = newObj;
        this.selectedId = selectedObj._id;
    }
    setNewData() {
        this.newData = this.getEmptyDataObj(this.data[0]);
        this.selectedId = "";
    }
    getDataArray(dataObj) {
        const entries = Object.entries(dataObj).filter(
            (entry) => entry[0] !== "_id"
        );
        return entries;
    }
    getEmptyDataObj(dataObj) {
        const entries = this.getDataArray(dataObj);
        const emptyObj = Object.fromEntries(
            entries.map((entry) => {
                const key = entry[0];
                let value;
                if (typeof entry[1] === "boolean") {
                    value = true;
                } else if (typeof entry[1] === "string") {
                    value = "";
                } else if (Array.isArray(entry[1])) {
                    value = [];
                }
                return [key, value];
            })
        );
        return emptyObj;
    }
    dragDropHandler(e, id) {
        this.methods.dragDropHandler(this, e, id);
    }
    async dropHandler(userId, bookId) {
        await this.methods.dropHandler(this, userId, bookId);
    }
}

export default LibraryStore;
