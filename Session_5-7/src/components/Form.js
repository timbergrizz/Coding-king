import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: "/age",
      state: {
        name: this.state.name,
      },
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Form;
