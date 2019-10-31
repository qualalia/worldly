import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Space from './Space.js';
import Options from './Options.js';
import Stickers from './Stickers.js';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      size: 10,
      shape: 'circle',
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { size, shape } = this.state;
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
	  <Route exact path="/stickers.js"
		 render={() =>
		   <div>
		     <Stickers />
		     <Options handleChange={this.handleChange}
					   sizeValue={size}
					   shapeValue={shape}
		     />
		   </div>
		 } />
	  <Route exact path="/space"
		 render={() => <Space />} />
	</div>

	{/* 	<div className="body-container">
	    <Stickers shape={shape}
	    size={size}
	    />
	    <Space />
	    <Options handleChange={this.handleChange}
	    sizeValue={size}
	    shapeValue={shape}
	    />
	    </div> */}
      </BrowserRouter>
    )
  }
};

export default Main;
