import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {

  const inputRef = useRef();

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        id="addItem"
        type="text"
        placeholder="Add New Item to the List"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        ref={inputRef}
      />
      <button type="submit" onClick={()=> inputRef.current.focus()}>
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
