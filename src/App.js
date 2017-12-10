import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyItems: ['milk', 'bread', 'fruits']

    }

  }

  addItem(event) {
    event.preventDefault()
    const { buyItems } = this.state;
    const newItem = this.newItem.value;

    this.setState({
      buyItems: [...this.state.buyItems, newItem]
    })

  }
  render() {
    const { buyItems } = this.state
    return (
      <div className="container">
        <h1>Shopping List</h1>
        <div className="content">

          <form className="form-inline" onSubmit={this.addItem.bind(this)}>
            <div className="form-group">
              <label htmlFor="newItemInput" className="sr-only">Add New Item</label>
              <input ref={input => {this.newItem = input}}
                type="text" className="form-control" id="newItemInput" />
            </div>
            <button className="btn btn-primary">Add</button>
          </form>

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
                  <tr key={item}>
                    <th scope="row">1</th>
                    <td>{item}</td>
                    <td>Button</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        </div>
      </div>
    );
  }
}

// const Headlines = () => {
//   return <h1 classNameName="title">Welcome to React world</h1>
// }

// const Greetings = (props) => {
//   const { name, age } = props
//   return <p>You will love it {name} ({age})</p>
// }


// Greetings.prototype = {
//   name: React.PropTypes.string,
//   age: React.PropTypes.number
// }

export default App;
