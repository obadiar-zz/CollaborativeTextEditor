import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import randomize from 'randomatic';

import Toolbar from './Toolbar'

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
		console.log(window.location.pathname)
		super(props);
		this.state = { editorState: EditorState.createEmpty(), id: randomize('Aa0', 16) };
		this.focus = () => this.editor.focus();
		this.onChange = (editorState) => this.setState({ editorState });
	}

	printContent() {
		console.log(this.state.editorState.getCurrentContent().getPlainText())
	}

	isHighlighted(button) {
		return this.state.editorState.getCurrentInlineStyle().has(button) ? 'highlighted' : ''
	}

	handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	render() {
		return (
			<div id='editor-container'>
				<h1>
					TEXT EDITOR
				</h1>
				<Toolbar editorState={this.state.editorState} onChangeFn={this.onChange} isHighlightedFn={(button) => (this.isHighlighted(button))} />
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
					<div id="document-id"><span id="document-id-label">Shareable ID</span><span id="document-id-text">{this.state.id}</span></div>
					<button className="bottom-button" onClick={this.printContent.bind(this)}>Log To Console</button>
					<button className="bottom-button">Save</button>
				</div>
			</div>
		);
	}
}

export default TextEditor;