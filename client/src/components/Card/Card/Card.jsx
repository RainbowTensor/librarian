import React from "react";
import { observer } from "mobx-react";
import "./Card.css";

function Card(props) {
    return <div className="cardWrapper">{props.children}</div>;
}

export default observer(Card);
