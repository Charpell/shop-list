import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import loader from './img.gif';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyItems: [],
      message: '',
      isLoading: false
    }
  }

  componentDidMount() {
    return axios.get('https://us-central1-restapo-c62d5.cloudfunctions.net/getAllItems').then((response) => {
      this.setState({
        isLoading: true,
        buyItems: response.data
      })
      this.setState({
        isLoading: false
      })
    })
  }

  addItem(event) {
    event.preventDefault()
    const { buyItems } = this.state;
    const newItem = this.newItem.value;

    const isOnTheList = buyItems.includes(newItem)

    if (isOnTheList) {
      this.setState({
        message: 'This item is already on the list'
      })

    } else {
      return newItem !== '' && axios.post(`https://us-central1-restapo-c62d5.cloudfunctions.net/helloWorld?items=${newItem}`).then((response) => {
        this.setState({
          isLoading: true,
          buyItems: response.data,
          message: ''
        })
        this.setState({
          isLoading: false
        })
        this.addForm.reset()
      })
    }

  }

  removeItem(item){
    const newBuyItems = this.state.buyItems.filter(buyItems => {
      return item !== buyItems
    })

    return axios.delete(`https://us-central1-restapo-c62d5.cloudfunctions.net/delete?id=${item.id}`).then((response) => {
      this.setState({
        isLoading: true,
        buyItems: response.data
      })
      this.setState({
        isLoading: false
      })
    })

    if(newBuyItems.length === 0){
      this.setState({
        message: 'No Item on the list, add some'
      })
    }
  }

  clearAll(){
    this.setState({
      buyItems: [],
      message: 'No Item on the list, add some'
    })
  }

  renderItems() {
    let id = 1;
    const { buyItems, message } = this.state;
    
    if(this.state.isLoading) {
      return <img src={(loader)}/>
    }
    return (
      buyItems.length > 0 &&
      <table className="table">
        <caption>Shopping List</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            buyItems.map(item => {
              return (
                <tr key={item.id}>
                  <th scope="row">{id++}</th>
                  <td>{item.items}</td>
                  <td>
                    <button onClick={(e) => this.removeItem(item)}  type="button" className="btn btn-default btn-sm">
                      Remove
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">&nbsp;</td>
            <td>
              <button onClick={(e) => this.clearAll()}
              className="btn btn-default btn-sm">Clear List</button>
            </td>
          </tr>
        </tfoot>
      </table>
    )
  }



  render() {
    const { buyItems, message } = this.state;
    return (
      <div className="container">
        <h1>Shopping List</h1>
        <div className="content">

          <form ref={input => {this.addForm = input}} className="form-inline" onSubmit={this.addItem.bind(this)}>
            <div className="form-group">
              <label htmlFor="newItemInput" className="sr-only">Add New Item</label>
              <input ref={input => {this.newItem = input}}
                type="text" className="form-control" id="newItemInput" />
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
          {
            (message !== '' || buyItems.length === 0) && <p className="message text-danger">{message}</p>
          }

         {this.renderItems()}

        </div>
      </div>
    );
  }
}

export default App;
