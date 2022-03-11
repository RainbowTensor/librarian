import "./AddRow.css";
import { observer } from "mobx-react";

function AddRow(props) {
    return (
        <div className="addRow">
            {typeof props.value === "string" && (
                <>
                    <label>{props.name}</label>
                    <input
                        type="text"
                        value={props.value}
                        onChange={(e) => props.onChange(e, props.name)}
                    />
                </>
            )}
        </div>
    );
}

export default observer(AddRow);
