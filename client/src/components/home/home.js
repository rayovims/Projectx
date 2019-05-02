import React from "react";
import './home.css';

export default class Home extends React.Component {
  state = {
    res: "",
    post: "",
    resToPost: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ res: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text();
    this.setState({ resToPost: body });
  };
  render() {
    return (
      <div>
        <p>{this.state.res}</p>
        <form onSubmit={this.handleSubmit}>
        <p>
            <strong>Post to server:</strong>
        </p>
        <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({post: e.target.value})}
        />
        <button type="submit">Submit</button>
        </form>
        <p>{this.state.resToPost}</p>
      </div>
    );
  }
}
