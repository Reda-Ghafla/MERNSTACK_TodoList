import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ShowAlert from "./components/ShowAlert";
import "./App.css";
import Modal from "./components/Modal";
// const data = []

// const getLocalStorage = () => {
//   const list = localStorage.getItem("list");
//   if (list) {
//     return JSON.parse(localStorage.getItem("list"));
//   } else {
//     return [];
//   }
// };

function App() {
  const [myValue, setMyValue] = useState({
    _id: "",
    title: "",
    description: "",
  });
  const [list, setList] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [modal, setModal] = useState(false);
  // const [seledItem, setSelectItem] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    // setList([...list, [name] : value])

    if (myValue) {
      setAlertMessage(true);

      // ajoutiw value db
      axios
        .post(`http://localhost:5000/api/todos`, myValue)
        .then((response) => {
          setList([
            ...list,
            {
              id: response.data._id,
              title: response.data.title,
              description: response.data.description,
            },
          ]);
          setAlertText("Added with success");
        })
        .catch((error) => {
          console.log(error);
        });
      setMyValue({ title: "", description: "" });
    } else {
      setAlertMessage(true);
      setAlertText("Please enter Somthing");
      setMyValue({ title: "", description: "" });
    }
  };

  const titleHandler = (e) => {
    const { value } = e.target;
    setMyValue({ description: myValue.description, title: value });
  };

  const descHandler = (e) => {
    const { value } = e.target;
    setMyValue({ description: value, title: myValue.title });
  };

  const deleteHandler = (id) => {
    // const deleteToDo = list.filter((item)=>item._id !== id)
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then((response) => {
        console.log(response.message);
        setAlertText("Deleted");
      })
      .catch((err) => err.message);
    setAlertMessage(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/todos`);
      setList(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeModal = () => {
    setModal(false);
  };


  const updateSelected = (id) => {
    const updateItem = list.find((item) => item._id === id);

    setModal(true);
    // console.log(updateItem);
    setMyValue(updateItem)
  };

  useEffect(() => {
    fetchData();
  }, [list]);

  return (
    <div className="App">
      <h1 className="grand__title">To Do List - GIT</h1>

      {alertMessage && (
        <ShowAlert alertText={alertText} setAlertMessage={setAlertMessage} />
      )}
      <form onSubmit={submitHandler}>
        {/* <p> {JSON.stringify(myValue)} </p> */}
        <input
          type="text"
          name="title"
          placeholder="Enter you `TO DO HERE`"
          className="input_title"
          value={myValue.title}
          onChange={(e) => titleHandler(e)}
        />
        <textarea
          type="text"
          placeholder="Description your TODO"
          className="input__desc"
          name="description"
          value={myValue.description}
          onChange={(e) => descHandler(e)}
        />
        <button type="submit">Add</button>
      </form>

      {list.length > 0 && (
        <div className="mylist">
          {" "}
          {list.map((item) => {
            return (
              <div key={item._id} className="todo">
                <p className="title"> {item.title} </p>
                <div className="desc">
                  {" "}
                  <p>{item.description}</p>{" "}
                </div>
                <div className="icons">
                  <span
                    className="edit"
                    onClick={() => updateSelected(`${item._id}`)}
                  >
                    <AiOutlineEdit />
                  </span>
                  <span
                    className="delete"
                    onClick={() => deleteHandler(`${item._id}`)}
                  >
                    <AiOutlineDelete />
                  </span>
                </div>
              </div>
            );
          })}{" "}
        </div>
      )}
      {modal && (
        <Modal
          myValue={myValue}
          setMyValue={setMyValue}
          closeModal={closeModal}
          list={list}
          setList={setList}
        />
      )}
    </div>
  );
}

export default App;
