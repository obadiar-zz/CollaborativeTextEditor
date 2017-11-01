import React from 'react';
import ReactDOM from 'react-dom';
import {
	Redirect
} from 'react-router';
import {
	BrowserRouter,
	Switch,
	Route,
	Link
} from 'react-router-dom'
import TextEditor from './TextEditor'
import DocumentContainer from './DocumentContainer'

class DocumentPortal extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="document-portal-container">
				<Route path="/document/:id" exact component={TextEditor} />
				<Route path="/" exact component={DocumentContainer} />
			</div>
		)
	};
}

export default DocumentPortal;