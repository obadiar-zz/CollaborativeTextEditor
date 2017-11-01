import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';

class InputModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			value: props.value ? props.value : ''
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			showModal: props.showModal
		})
	}

	closeModal() {
		this.setState({
			showModal: false
		})
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		})
	}

	handleSave() {
		this.props.save(this.state.value)
		this.setState({
			showModal: false,
			value: ''
		})
	}

	render() {
		return (
			<Modal id="modal" show={this.state.showModal} onHide={this.closeModal.bind(this)}>
				<Modal.Body id="modal-body">
					<h2>{this.props.title}</h2>
					<input id="modal-input" className="blue" type={this.props.type} onChange={this.handleChange.bind(this)} value={this.state.value} autoFocus maxLength={this.props.type === "text" ? "16" : ""} />
					<div id="modal-footer">
						{this.state.value.length !== 0 ? <Button className="bottom-button" onClick={this.handleSave.bind(this)}>Save</Button> : ''}
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default InputModal;