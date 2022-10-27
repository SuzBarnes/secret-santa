import React from "react";

const likeOrDislike = ({ notEditable, item }) => {
  //   const handleLikeChange = (event) => {
  //     likes.split(", ").filter;
  //   };

  const handleDelete = (event) => {
    console.log(event.target.value);
  };
  return (
    <div className="like-container" key={item}>
      <input
        className="field-value"
        id="likes"
        name="likes"
        placeholder="likes"
        type="text"
        value={item}
        readOnly={notEditable}
      />
      {!notEditable && (
        <button className="like-button" type="submit" onClick={handleDelete}>
          -
        </button>
      )}
    </div>
  );
};

export default likeOrDislike;
