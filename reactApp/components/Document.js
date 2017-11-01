import React, { Component } from 'react'
import {
	Link
} from 'react-router-dom';

export default class Document extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const doc = this.props.doc;
		return (
			<div>
				<Link to={{ pathname: '/document/' + doc.ID, state: { title: doc.title, content: doc.content, password: doc.password } }}>
					<div className="document-li blue" >
						<div className="document-icon">
							<img src="http:/localhost:3000/icons/document.png" />
						</div>
						<span>
							{doc.title}
						</span>
					</div>
				</Link>
			</div>
		)
	}
}
