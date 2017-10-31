import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from './Editor'

class App extends React.Component {
	render() {
		return (
			<div id='app'>
				<h1>
					TEXT EDITOR
				</h1>
				<TextEditor id="editor" />
			</div>
		);
	}
}

export default App;