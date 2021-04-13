import React, { Component } from 'react';
export default class App extends Component {
	constructor() {
		super();
		this.state = {
			list: [],
			index: [],
			buttonValue: '',
			mainjoke: [],
			joke: ''
		};
	}

	componentDidMount() {
		fetch('https://api.chucknorris.io/jokes/categories').then((response) => response.json()).then((data) => {
			this.setState({ list: data });
		});
	}
	render() {
		const randomjokes = (e) => {
			fetch(`https://api.chucknorris.io/jokes/random?${e}/value`).then((response) => response.json()).then((data) => {
				this.setState({ mainjoke: data.value });
			});
		};

		const JokePage = () => {
			const but = this.state.buttonValue;
			const joke = this.state.mainjoke;
			return (
				<div className="Joke__Box">
					<h2 className="Joke__Title">
						Selected Category : <span>{but}</span>{' '}
					</h2>
					<div className="joke__Area" key={this.state.mainjoke.index}>
						<h3 className="Joke__Mian" key={this.state.mainjoke.index}>
							{joke}
						</h3>
					</div>
					<button
						className="new__joke"
						key={but.length}
						name={but}
						value={but}
						type="submit"
						onClick={(e) => {
							this.setState({ buttonValue: e.target.value });
							randomjokes(this.state.buttonValue);
						}}
					>
						New Joke
					</button>
				</div>
			);
		};
		return (
			<div className="mainContainer">
				<h1>Chuck Norris jokes website.</h1>
				<div className="buttonContaines">
					{this.state.list.map((item) => (
						<div className="all__buttons" key={item.index}>
							<button
								key={item.index}
								name={item}
								value={item}
								className="mainButton"
								type="submit"
								onClick={(e) => {
									this.setState({ buttonValue: e.target.value });
									randomjokes(this.state.buttonValue);
								}}
							>
								{item}
							</button>
						</div>
					))}
				</div>
				<JokePage />
			</div>
		);
	}
}
