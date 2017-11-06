import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';

class ErrorModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			showModal: props.showModal
		})
		if (props.showModal) {
			setTimeout(this.closeModal.bind(this), props.duration * 1000);
		}
	}

	closeModal() {
		this.props.closeModal();
		this.setState({
			showModal: false
		})
	}

	render() {
		return (
			<Modal id="error-modal" show={this.state.showModal} onHide={this.closeModal.bind(this)}>
				<Modal.Body id="error-modal-body">
					<div id="error-modal-title">
						Error
					</div>
					<br />
					<h5>> {this.props.message}</h5>
				</Modal.Body>
			</Modal>
		);
	}
}

export default ErrorModal;