import React from "react";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Link to="/read">Read</Link>
        <Link to="/create">Create</Link>
      </div>
    );
  }
}

export default Navigation;
