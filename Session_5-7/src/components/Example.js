import React from "react";

class EventExample extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructed! yay!");
  }
  state = {
    content: "lalala",
  };

  componentDidMount() {
    console.log("rendered! yay!");
  }

  componentDidUpdate() {
    console.log("rendered! yay!");
  }
  render() {
    console.log("render! yay;");
    return (
      <div
        onClick={() => {
          this.setState({ content: "Helloooooo" });
        }}
      >
        {this.state.content}
      </div>
    );
  }
}

export default EventExample;
