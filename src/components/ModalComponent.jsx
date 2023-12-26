import React from "react";
import Modal from "react-modal";

const ModalComponent = ({
	title,
	content,
	isOpen,
	buttonContent,
	deleteData,
	currentData,
	handleCloseModal,
}) => {
	return (
		<Modal isOpen={isOpen} contentLabel="Example Modal">
			<h2>{title}</h2>
			<p>{content}</p>
			<button onClick={() => deleteData(currentData[0])}>
				{buttonContent}
			</button>
			<button onClick={() => handleCloseModal()}>閉じる</button>
		</Modal>
	);
};

export default ModalComponent;
