
import './App.css';
import axios from 'axios';
import React, { Component } from 'react';

class App extends Component {

  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false,
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  onFileUpload = () => {
    const formdata = new FormData();
    formdata.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    axios.post("https://ban5gzfire.execute-api.ap-south-1.amazonaws.com/prod/upload-files",formdata).then(() => {
      // console.log(formdata);
      this.setState({ selectedFile: null });
      this.setState({ fileUploadedSuccessfully: true });
    })
   
  }

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>Last Modified: {" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else if (this.state.fileUploadedSuccessfully){
      return (
        <div>
          <p>Your File has been uploaded successfully</p>
        </div>
      );
    } else {
      return (
        <div>
          <br/>
          <h4>Choose a file and then press the upload button</h4>
        </div>
      )
    }

  }


  render() {
    return (
      <div className='Container'>
        <h2>Ameer File Upload System</h2>
        <h3>File Upload with REACT UI and a ServerLess API </h3>
        <div>
          <input type='file' onChange={this.onFileChange}></input>
          <button onClick={this.onFileUpload}>Upload</button>
        </div>
        {this.fileData()}
      </div>
    )
  }

}

export default App;
