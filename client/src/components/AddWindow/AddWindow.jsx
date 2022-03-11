import React from "react";
import { observer } from "mobx-react";
import AddRow from "../AddRow/AddRow";
import "./AddWindow.css";

function AddWindow({ store }) {
    const onChangeHandler = (e, name) => {
        const value = e.target.value;
        store.updateData(name, value);
    };
    const addEventHandler = (e) => {
        store.toggleAddWindow();
        store.postItem();
    };
    const closeWindow = (e) => {
        store.toggleAddWindow();
        store.setNewData();
    };
    const newData = store.newData;
    const dataKeys = Object.keys(newData);
    return (
        <div className="addWindowWrapper" onClick={closeWindow}>
            <div className="addWindow" onClick={(e) => e.stopPropagation()}>
                <h3>{store.selectedId ? "Edit" : "Add"}</h3>
                {dataKeys.map((key, idx) => {
                    let entryName, entryValue;
                    [entryName, entryValue] = [key, newData[key]];
                    console.log("entryName, entryValue", entryName, entryValue);
                    //entryName = entryName
                    //    .split("_")
                    //    .map(
                    //        (word) =>
                    //            word.charAt(0).toUpperCase() + word.slice(1)
                    //    )
                    //    .join(" ");
                    return (
                        <AddRow
                            name={entryName}
                            value={entryValue}
                            onChange={onChangeHandler}
                            key={idx}
                        />
                    );
                })}
                <button onClick={addEventHandler}>
                    {store.selectedId ? "Set" : "Add"}
                </button>
            </div>
        </div>
    );
}

export default observer(AddWindow);
