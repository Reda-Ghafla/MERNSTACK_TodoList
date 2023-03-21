import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

const Modal = ({ closeModal, myValue, list, setList, setMyValue }) => {
  const { _id, title, description } = myValue;
  //   console.log(myValue);

  const updateHandler = (e) => {
    e.preventDefault();

    //     axios.put(`http://localhost:5000/todos/${id}`, {

    //     })
  };

  const editTitle = (e) => {
    setMyValue({
      _id,
      title: e.target.value,
      description,
    });
  };
  const editDesc = (e) => {
    setMyValue({
      _id,
      title,
      description: e.target.value,
    });
  };

  const updated = () => {
    // setSelectItem([...list, seledItem])
    const check = list.filter((item) => item._id !== myValue._id);
    setList([...check, myValue]);
    // console.log([...check, myValue]);
    console.log([...check, myValue]);
    axios
      .put(`http://localhost:5000/api/todos/${_id}`, myValue)
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((err) => console.log(err.message));

    closeModal();
    setMyValue({ title: "", description: "" });
  };

  return (
    <div className="modal">
      <div className="modal_under">
        <span className="close" onClick={closeModal}>
          <AiOutlineClose />
        </span>
        <div className="signle_item_to_update" key={_id}>
          <form onSubmit={updateHandler}>
            <p> {_id} </p>
            <input
              type="text"
              name="title"
              placeholder={title}
              className="input_title"
              value={title}
              onChange={(e) => editTitle(e)}
            />
            <textarea
              type="text"
              placeholder={description}
              className="input__desc"
              name="description"
              value={description}
              onChange={(e) => editDesc(e)}
            />
            <div className="icons">
              <span
                className="delete"
                onClick={() => {
                  updated();
                }}
              >
                <span>Update</span>
                <MdUpdate />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
