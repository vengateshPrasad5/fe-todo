import React from "react";
import { FaTrash } from "react-icons/fa";

const Item = ({ item, handleCheck, deleteTask }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
      />
      <label>{item.task}</label>
      <FaTrash role="button" onClick={() => deleteTask(item.id)}></FaTrash>
    </li>
  );
};

export default Item;
