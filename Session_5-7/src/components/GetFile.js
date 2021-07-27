import React from "react";
import axios from "axios";

class GetFile extends React.Component {
  state = {
    filename: "",
    content: "",
    isLoading: true,
  };

  componentDidMount() {
    let filename = this.props.filename;
    axios.get("http://localhost:3030/view/" + filename).then((data) => {
      this.setState({
        filename: data.data.filename,
        content: data.data.content,
        isLoading: false,
      });
    });
  }

  componentDidUpdate() {
    let filename = this.props.filename;
    console.log(filename);
    if (filename != this.state.filename) {
      axios.get("http://localhost:3030/view/" + filename).then((data) => {
        this.setState({
          filename: data.data.filename,
          content: data.data.content,
          isLoading: false,
        });
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>{this.state.filename}</h1>
            <p>{this.state.content}</p>
          </div>
        )}
      </div>
    );
  }
}

export default GetFile;
