import React from "react";

class Cards extends React.Component {
  render() {
    let img = "https://cdn.hswstatic.com/gif/arctic-fox-1.jpg";
    let title = "this fox is cute";
    let desc = "this fox is cute";
    return (
      <div>
        <img src={img} alt="" width="300px" />
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    );
  }
}

export default Cards;
