import React, { Component } from 'react';
import LifeCycleSample from './LifeCycleSample';
import ErrorBoundary from './ErrorBoundary';

function getRandmoColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
	state = {
		color: '#000',
	};
	handleClick = () => {
		this.setState({
			color: getRandmoColor(),
		});
	};
	render() {
		return (
			<div>
				<button onClick={this.handleClick}>랜덤색상</button>
				<ErrorBoundary>
					<LifeCycleSample color={this.state.color} />
				</ErrorBoundary>
			</div>
		);
	}
}

export default App;
