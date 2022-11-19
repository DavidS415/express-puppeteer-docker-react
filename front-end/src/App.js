import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    url: [],
    date: [],
    filepath: [],
    title: []
  };


  componentDidMount() {
    this.getBackendAPI()
    .catch(err => console.log(err));
  }

  getBackendAPI = async () => {
    const response = await fetch('http://localhost:5000/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    var urls = []
    var dates = []
    var files =[]
    var titles = []
    for(let i = 0; i < body.length; i++) {
      urls.push(body[i]['url']);
      dates.push(body[i]['date']);
      files.push(body[i]['filePath']);
      titles.push(body[i]['title']);
    }
    this.setState({ url: urls });
    this.setState({ date: dates });
    this.setState({ filepath: files })
    this.setState({ title: titles });
  }

  postBackendAPI = async () => {
    const urlSub = document.getElementById('link').value;
    console.log(urlSub)
    if(urlSub === ''){
      return alert("Please enter a valid URL");
    }
    fetch('http://localhost:5000/save', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'url': urlSub
      })
    })
    if(!alert('Your web page was saved as a PDF'))setTimeout(function(){window.location.reload();}, 5000)
  }

  render () {
    const submission = (
      <div>
        <h3>Enter a URL to save web page as a PDF:</h3>
        <input id="link" type="text"></input>
        <button onClick={this.postBackendAPI}>Save PDF</button>
      </div>
    )
    const results = (
      <div>
        <table>
          <tr>
            <td>Date:</td>
            <td>Title:</td>
            <td>URL:</td>
            <td>File Link:</td>
          </tr>
          <tr>
            <td>
              {this.state.date.map(item => (
                <tr>
                  <td class='item'>
                    {item}
                  </td>
                </tr>
              ))}
            </td>
            <td>
              {this.state.title.map(item => (
                <tr>
                  <td class='item'>
                    {item}
                  </td>
                </tr>
              ))}
            </td>
            <td>
              {this.state.url.map(item => (
                <tr>
                  <td class='item'>
                    <a href={item}>{item}</a>
                  </td>
                </tr>
              ))}
            </td>
            <td>
              {this.state.filepath.map(item => (
                <tr>
                  <td class='item'>
                    <a href={item}>{item}</a>
                  </td>
                </tr>
              ))}
            </td>
          </tr>
        </table>
      </div>
    );
    return[submission, results]
  }
}

export default App;
