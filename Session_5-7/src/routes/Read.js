import React from "react";
import GetFile from "../components/GetFile";
import axios from "axios";
import { Link } from "react-router-dom";

class Read extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filename: "",
      isLoading: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:3030/list").then((data) => {
      this.setState({
        list: data.data,
        isLoading: false,
      });
      console.log(this.state.list);
    });
  }

  handleClick(event) {
    this.setState({ filename: event.target.id });
  }

  handleDelete(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3030/delete", { filename: this.state.filename })
      .then((data) => {
        if (data.data.success) {
          alert("Delete success");
          this.setState({ filename: "" });

          axios.get("http://localhost:3030/list").then((data) => {
            this.setState({
              list: data.data,
              isLoading: false,
            });
            console.log(this.state.list);
          });
        }
      });
  }

  render() {
    let isLoading = this.state.isLoading;
    let list = this.state.list;
    return (
      <div>
        {isLoading ? (
          <div> Loading...</div>
        ) : (
          <div>
            {list.map((data) => {
              return (
                <p id={data} onClick={this.handleClick}>
                  {data}
                </p>
              );
            })}
          </div>
        )}
        {this.state.filename === "" ? (
          <div></div>
        ) : (
          <div>
            <GetFile filename={this.state.filename} />
            <Link to={`/update/${this.state.filename}`}>Update</Link>
            <a onClick={this.handleDelete}>Delete</a>
          </div>
        )}
      </div>
    );
  }
}

export default Read;
