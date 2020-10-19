import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      quotes: null,
      index: 0,
      author: "Kevin Kruse",
      quote:
        "Life isn’t about getting and having, it’s about giving and being.",
    };
  }
  componentDidMount = () => {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ quotes: response.data.quotes });
        console.log(this.state.quotes);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getNotes = () => {
    const index = Math.floor(Math.random() * this.state.quotes.length);
    this.setState({ index: index });
    console.log(this.state.index);
    const obj = this.state.quotes.filter((quote) => {
      return this.state.quotes.indexOf(quote) === this.state.index;
    })[0];
    this.setState({ author: obj.author });
    this.setState({ quote: obj.quote });
  };
  render() {
    return (
      <div className="App">
        <h1 className="head">Random Quote Generator</h1>
        <div className="outer">
          <div className="notes">
            <h3>{this.state.quote}</h3>
            <h2>{this.state.author}</h2>
          </div>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${this.state.quote} ${this.state.author}`}
            target="_blank"
            title="Post this quote on twitter!"
          >
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <button onClick={this.getNotes}>Get Notes</button>
        </div>
      </div>
    );
  }
}

export default App;
