import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
          <h1>Redux Blog</h1>
          <div>
              {this.props.children}
          </div>
      </div>
    );
  }
}
