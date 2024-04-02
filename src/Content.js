import React from "react";
import ItemList from "./ItemList";

const Content = ({ items, handleCheck, deleteTask }) => {
  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          deleteTask={deleteTask}
        />
      ) : (
        <p>Your tasks are done, Go ahead and check tomorrow</p>
      )}
    </>
  );
};

export default Content;
