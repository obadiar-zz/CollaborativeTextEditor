import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils, CompositeDecorator } from 'draft-js';
import InputModal from './InputModal'


class Toolbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		}
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

	search(value) {
		// console.log(this.props.editorState.getCurrentContent().getPlainText().indexOf(value) !== -1);
		this.props.setEditorState(EditorState.set(this.props.editorState, { decorator: generateDecorator(value) }));
	}

	saveSearchTerm(value) {
		this.search(value);
		this.closeModal()
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

	render() {
		return (
			<div id='editor-toolbar'>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('BOLD'))()} id="bold-button" onClick={this._onBoldClick.bind(this)}>B</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('ITALIC'))()} id="italic-button" onClick={this._onItalicClick.bind(this)}>I</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('UNDERLINE'))()} id="underline-button" onClick={this._onUnderlineClick.bind(this)}>U</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('CODE'))()} id="code-button" onClick={this._onCodeClick.bind(this)}>C</button>
				<select defaultValue={'regular'/*(() => this.props.isHighlightedFn('CODE'))()*/} className="toolbar-button" id="font-size-select" onChange={this._onSizeChange.bind(this)}>
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
					<img src={process.env.BACKEND + '/icons/align-left.png'} />
				</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('center'))()} id="align-center-button" onClick={this._onAlignCenter.bind(this)}>
					<img src={process.env.BACKEND + '/icons/align-center.png'} />
				</button>
				<button className={"toolbar-button " + (() => this.props.isHighlightedFn('right'))()} id="align-right-button" onClick={this._onAlignRight.bind(this)}>
					<img src={process.env.BACKEND + '/icons/align-right.png'} />
				</button>
				<button className="toolbar-button" id="search-button" onClick={this.openModal.bind(this)}>
					Search <img src={process.env.BACKEND + '/icons/magnifier.png'} />
				</button>
				<div id="document-id-container">
					<div id="document-id"><span id="document-id-label">Shareable ID</span><span id="document-id-text">{this.props.documentID}</span></div>
				</div>
				<InputModal showModal={this.state.showModal} value="" title="Enter search term" type="text" save={this.saveSearchTerm.bind(this)} closeModal={this.closeModal.bind(this)} />
			</div>
		)
	}
};

const generateDecorator = (highlightTerm) => {
	const regex = new RegExp(highlightTerm, 'g');
	return new CompositeDecorator([{
		strategy: (contentBlock, callback) => {
			if (highlightTerm !== '') {
				findWithRegex(regex, contentBlock, callback);
			}
		},
		component: SearchHighlight,
	}])
};

const findWithRegex = (regex, contentBlock, callback) => {
	const text = contentBlock.getText();
	let matchArr, start, end;
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index;
		end = start + matchArr[0].length;
		callback(start, end);
	}
};

const SearchHighlight = (props) => (
	<span className="search-and-replace-highlight">{props.children}</span>
);

export default Toolbar;