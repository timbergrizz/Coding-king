import React from "react";
import axios from "axios";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      content: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = {
      filename: this.state.filename,
      content: this.state.content,
    };

    axios.post("http://localhost:3030/create", data).then((data) => {
      console.log(data);
      if (data.data.success) {
        alert("Success");
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              id="filename"
              value={this.state.filename}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <input
              type="text"
              id="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Create;
