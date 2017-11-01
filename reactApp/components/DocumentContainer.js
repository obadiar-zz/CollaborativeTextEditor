import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Switch,
	Route,
	Link
} from 'react-router-dom'

class DocumentContainer extends React.Component {
	constructor(props) {
		super(props);
		console.log('Document container loaded!');
	}
	render() {
		return (
			<div id="document-portal-container">
				<h1>
					Document Portal
				</h1>
				<div id="documents-container">
					<ul>
						<li>
							<Link to="/document/1" >Document #1</Link>
						</li>
						<li>
							<Link to="/document/2" >Document #2</Link>
						</li>
						<li>
							<Link to="/document/3" >Document #3</Link>
						</li>
						<li>
							<Link to="/document/4" >Document #4</Link>
						</li>
					</ul>
				</div>
				<div id="editor-bottom-bar">
					<button className="bottom-button">Add w/ ID</button>
					<button className="bottom-button">Create New</button>
				</div>
			</div>
		)
	};
}

export default DocumentContainer;