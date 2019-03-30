import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from 'store/modules/counter';
import * as postActions from 'store/modules/post';

class App extends Component {
  componentDidMount() {
    const { number, PostActions } = this.props;
    PostActions.getPost(number);
  }

  componentDidUpdate(prevProps, prevState) {
    const { number, PostActions } = this.props;
    if (prevProps.number !== this.props.number) {
      PostActions.getPost(number);
    }
  }

  handleIncrement = () => {
    const { CounterActions } = this.props;
    CounterActions.incrementAsync();
  };

  handleDecrement = () => {
    const { CounterActions } = this.props;
    CounterActions.decrementAsync();
  };

  render() {
    const { number, post } = this.props;
    const { handleIncrement, handleDecrement } = this;
    return (
      <>
        <div>숫자 : {number}</div>
        <button onClick={handleDecrement}>감소</button>
        <button onClick={handleIncrement}>증가</button>
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      </>
    );
  }
}

export default connect(
  state => ({
    number: state.counter.value,
    post: state.post.data,
  }),
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
  }),
)(App);
