import AddItem from "./AddItem";
import "./App.css";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import React, { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const [items, setItems] = useState([]);
  // { id: 1, checked: true, description: "Practice Java" },
  // { id: 2, checked: true, description: "Practice UI" },
  // { id: 3, checked: false, description: "Practice DB" },
  // JSON.parse(localStorage.getItem("todo_list")) || []

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItems(listItems);

    console.log(listItems);
    localStorage.setItem("todo_list", JSON.stringify(listItems));
    console.log(localStorage.getItem("todo_list"));

    const updatedItem = listItems.find((item) => item.id === id); // Find the updated item

    const putOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    };

    const response = await apiRequest(API_URL + "/updateTask", putOptions);

    if (response.ok) fetchItems();

    if (response instanceof Error) setIsError(response);
  };

  const deleteTask = async (id) => {
    // const listItems = items.map((item) => (item.id === id ? {} : item));

    const listItems = items.filter((item) => item.id !== id);

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(updatedItem),
    };

    const response = await apiRequest(
      API_URL + `/deleteTask/${id}`,
      deleteOptions
    );

    console.log(response);

    if (response.ok) fetchItems();

    // if (response) return setItems(listItems);

    // localStorage.setItem("todo_list", JSON.stringify(listItems));

    // console.log(localStorage.getItem("todo_list"));
  };

  const [newItem, setNewItem] = useState();

  const addItem = async (description) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id: id, checked: false, task: description };

    const listItems = [...items, addNewItem];

    setItems(listItems);

    console.log(listItems);
    localStorage.setItem("todo_list", JSON.stringify(listItems));
    console.log(localStorage.getItem("todo_list"));

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };

    const response = await apiRequest(API_URL + "/addTask", postOptions);
    console.log(response);

    if (response instanceof Error) setIsError(response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item Added");
    console.log(newItem);
    if (!newItem) return;
    addItem(newItem);
    // fetchItems();
    setNewItem(" ");
  };

  const [searchItem, setSearchItem] = useState("");

  const API_URL = "http://localhost:8080/api/v1";

  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    try {
      // const resp1 = apiRequest1(API_URL + "/getTask");
      const response = await apiRequest(API_URL + "/getTask");
      const listItems = await response.json();

      // console.log(resp1);
      console.log(listItems.data);
      setItems(listItems.data);
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    fetchItems();
    // }, 3000);
  }, []);

  return (
    <div className="App">
      <Header title="React TODO Demo App" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />
      <main>
        {isLoading && <p>Your List is Loading, Please wait</p>}
        {isError && <p>Error While Fetching the Items</p>}
        {!isError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.task.toLowerCase().includes(searchItem.toLowerCase())
            )}
            handleCheck={handleCheck}
            deleteTask={deleteTask}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
