import React from "react";
import axios from "axios";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pre_file: this.props.match.params.filename,
      new_file: "",
      content: "",
      isLoading: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = {
      pre_file: this.state.pre_file,
      new_file: this.state.new_file,
      content: this.state.content,
    };

    axios.post("http://localhost:3030/update", data).then((data) => {
      console.log(data);
      if (data.data.success) {
        alert("Success");
      }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  componentDidMount() {
    let pre_file = this.state.pre_file;
    if (pre_file != "") {
      axios.get("http://localhost:3030/view/" + pre_file).then((data) => {
        this.setState({
          new_file: data.data.filename,
          content: data.data.content,
          isLoading: false,
        });
        console.log(this.state);
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              id="new_file"
              value={this.state.new_file}
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

export default Update;
