import React from "react";
import axios from "axios";

class Age extends React.Component {
  state = {
    name: "",
    age: 0,
    count: 0,
    isLoading: true,
  };

  componentDidMount() {
    let name = this.props.location.state.name;
    axios.get("https://api.agify.io/?name=" + name).then((data) => {
      console.log(data);
      let data_get = data.data;
      this.setState({
        isLoading: false,
        name: data_get.name,
        age: data_get.age,
        count: data_get.count,
      });
    });
  }

  render() {
    console.log(this.props.location.state);
    return (
      <div>
        {this.state.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h1>{this.state.age}</h1>
            <h1>{this.state.name}</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Age;
