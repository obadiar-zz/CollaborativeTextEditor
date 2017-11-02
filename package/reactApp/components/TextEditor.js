import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import randomize from 'randomatic';
import { Link } from 'react-router-dom'
import axios from 'axios';

import InputModal from './InputModal'
import Toolbar from './Toolbar'
import Logout from './Logout'

const styleMap = {
	BLACK: {
		color: 'black',
	},
	RED: {
		color: 'red',
	},
	GREEN: {
		color: 'green',
	},
	BLUE: {
		color: 'blue',
	},
	YELLOW: {
		color: 'yellow'
	},
	SMALLEST: {
		fontSize: 12
	},
	SMALL: {
		fontSize: 15
	},
	REGULAR: {
		fontSize: 18
	},
	LARGE: {
		fontSize: 24
	},
	LARGEST: {
		fontSize: 30
	},
};

const myBlockStyleFn = (contentBlock) => {
	const type = contentBlock.getType();
	switch (type) {
		case 'right':
			return 'block-align-right'
		case 'center':
			return 'block-align-center'
		case 'left':
			return 'block-align-left'
		default:
			return ''
	}
}

class TextEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// editorState: EditorState.createEmpty(),
			editorState: props.location.state ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.location.state.content))) : EditorState.createEmpty(),
			title: props.location.state ? props.location.state.title : '',
			id: props.location.pathname.split('/')[2],
			saved: false,
			showModal: false,
			password: '',
			tempPassword: props.location.state ? props.location.state.password : '',
		};
		this.focus = () => this.editor.focus();
		this.onChange = (editorState) => this.setState({ editorState });
	}

	printContent() {
		console.log(this.state.editorState.getCurrentContent().getPlainText())
	}

	isHighlighted(button) {
		return this.state.editorState.getCurrentInlineStyle().has(button) ? 'highlighted' : ''
	}

	savePassword(value) {
		this.setState({
			password: value
		}, () => this.closeModal());
	}

	openModal() {
		this.setState({
			showModal: true
		})
	}

	closeModal() {
		this.setState({
			showModal: false
		})
	}

	handleTitleChange(e) {
		this.setState({
			title: e.target.value
		})
	}

	handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	handleSave() {
		axios.post('http://localhost:3000/documents/save', {
			ID: this.state.id,
			title: this.state.title,
			password: this.state.password,
			content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
		})
			.then(resp => {
				console.log(resp.data);
				this.setState({
					saved: true
				})
				setTimeout(() =>
					this.setState({
						saved: false
					}), 1000)
			})
			.catch(error => {
				console.log('Error saving document:', error.response.data.message);
			})
	}

	render() {
		return (
			<div id='editor-container'>
				<Logout logout={() => this.props.history.push('/login')} />
				<h1>
					Text Editor
				</h1>
				<div id="document-title">
					<span id="title-label">Title</span>
					<input type="text" id="title-input" onChange={this.handleTitleChange.bind(this)} value={this.state.title} />
				</div>
				<Toolbar editorState={this.state.editorState} documentID={this.state.id} onChangeFn={this.onChange} isHighlightedFn={(button) => (this.isHighlighted(button))} />
				<div onClick={this.focus}>
					<Editor
						customStyleMap={styleMap}
						blockStyleFn={myBlockStyleFn}
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
						ref={(ref) => this.editor = ref} />
				</div>
				<div id="editor-bottom-bar">
					<div id="save-message">
						{this.state.saved ? <span>Changes Saved Successfully!</span> : <Link to="/portal"><button className="bottom-button">Go Back</button></Link>}
					</div>
					<button className="bottom-button" onClick={this.openModal.bind(this)}>Password</button>
					<InputModal showModal={this.state.showModal} value={this.state.tempPassword} title="Password" type="password" save={this.savePassword.bind(this)} closeModal={this.closeModal.bind(this)} />
					<button className="bottom-button" onClick={this.handleSave.bind(this)}>Save</button>
				</div>
			</div>
		);
	}
}

export default TextEditor;