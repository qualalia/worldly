import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Space from './Space.js';
import Options from './Options.js';
import Stickers from './Stickers.js';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      size: 20,
      shape: 'circle',
      t: 0,
    }
  }
  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      16
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  tick = () => {
    this.setState({
      t: this.state.t + 0.02,
    });
  }
  render() {
    const { size, shape, t } = this.state;
    return (
      <BrowserRouter>
	<nav>
	  <NavLink exact to="/stickers"
		   activeClassName="selected">
	    Stickers
	  </NavLink>
	  <NavLink exact to="/space"
		   activeClassName="selected">
	    Space
	  </NavLink>
	</nav>
	<div className="body-container">
	  <Route exact path="/stickers"
		 render={() =>
		   <div>
		     <Stickers t={t}
			shape={shape}
			size={size}/>
		     <Options handleChange={this.handleChange}
			sizeValue={size}
			shapeValue={shape}
		     />
		   </div>
		 } />
	  <Route exact path="/space"
		 render={() => <Space />} />
	</div>
      </BrowserRouter>
    )
  }
};

export default Main;
