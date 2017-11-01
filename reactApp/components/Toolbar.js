import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';


class Toolbar extends React.Component {
	constructor(props) {
		super(props);
	}

	_onBoldClick() {
		this.props.onChangeFn(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'));
	}

	_onItalicClick() {
		this.props.onChangeFn(RichUtils.toggleInlineStyle(this.props.editorState, 'ITALIC'));
	}

	_onUnderlineClick() {
		this.props.onChangeFn(RichUtils.toggleInlineStyle(this.props.editorState, 'UNDERLINE'));
	}

	_onCodeClick() {
		this.props.onChangeFn(RichUtils.toggleInlineStyle(this.props.editorState, 'CODE'));
	}

	_onSizeChange(e) {
		this.props.onChangeFn(RichUtils.toggleInlineStyle(this.props.editorState, e.target.value.toUpperCase()));
		// e.target.value = 'regular';
	}

	_onColorChange(e) {
		this.props.onChangeFn(RichUtils.toggleInlineStyle(this.props.editorState, e.target.value.toUpperCase()));
		// e.target.value = 'black';
	}

	_onAlignRight() {
		this.props.onChangeFn(RichUtils.toggleBlockType(this.props.editorState, 'right'));
	}

	_onAlignLeft() {
		this.props.onChangeFn(RichUtils.toggleBlockType(this.props.editorState, 'left'));
	}

	_onAlignCenter() {
		this.props.onChangeFn(RichUtils.toggleBlockType(this.props.editorState, 'center'));
	}

	render() {
		return (
			<div id='editor-toolbar'>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('BOLD'))()} id="bold-button" onClick={this._onBoldClick.bind(this)}>B</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('ITALIC'))()} id="italic-button" onClick={this._onItalicClick.bind(this)}>I</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('UNDERLINE'))()} id="underline-button" onClick={this._onUnderlineClick.bind(this)}>U</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('CODE'))()} id="code-button" onClick={this._onCodeClick.bind(this)}>C</button>
				<select defaultValue={(() => this.props.isHighlightedFn('CODE'))()} className="toolbar-button" id="font-size-select" onChange={this._onSizeChange.bind(this)}>
					<option value="smallest">Smallest</option>
					<option value="small">Small</option>
					<option value="regular">Regular</option>
					<option value="large">Large</option>
					<option value="largest">Largest</option>
				</select>
				<select className="toolbar-button" id="font-color-select" onChange={this._onColorChange.bind(this)}>
					<option value="black">Black</option>
					<option value="red">Red</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					<option value="yellow">Yellow</option>
				</select>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('left'))()} id="align-left-button" onClick={this._onAlignLeft.bind(this)}>
					<img src="http:localhost:3000/icons/align-left.png" alt="" />
				</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('center'))()} id="align-center-button" onClick={this._onAlignCenter.bind(this)}>
					<img src="http:localhost:3000/icons/align-center.png" alt="" />
				</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('right'))()} id="align-right-button" onClick={this._onAlignRight.bind(this)}>
					<img src="http:localhost:3000/icons/align-right.png" alt="" />
				</button>
				<div id="document-id-container">
					<div id="document-id"><span id="document-id-label">Shareable ID</span><span id="document-id-text">{this.props.documentID}</span></div>
				</div>
			</div>
		)
	}
};

export default Toolbar;