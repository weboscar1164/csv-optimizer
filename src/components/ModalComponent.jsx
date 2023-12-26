import React from "react";
import Modal from "react-modal";

const ModalComponent = ({
	title,
	content,
	isOpen,
	showModal,
	buttonContent,
	deleteData,
	editData,
	downloadData,
	currentData,
	setCurrentData,
	handleCloseModal,
}) => {
	const clickHandler = () => {
		if (showModal === "delete") {
			deleteData(currentData.id);
		} else if (showModal === "edit") {
			editData(currentData);
		} else {
			downloadData();
		}
	};

	const onEditData = (key, value) => {
		const editedData = {
			...currentData,
			[key]: value,
		};
		setCurrentData(editedData);
		console.log(currentData);
	};

	return (
		<Modal isOpen={isOpen} contentLabel="Example Modal">
			<h2>{title}</h2>

			{showModal == "edit" && currentData ? (
				<table>
					<tbody>
						<tr>
							<td>氏名</td>
							<td>
								<input
									type="text"
									value={currentData.name}
									onChange={(e) => onEditData("name", e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>住所1</td>
							<td>
								<input
									type="text"
									value={currentData.address1}
									onChange={(e) => onEditData("address1", e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>住所2</td>
							<td>
								<input
									type="text"
									value={currentData.address2}
									onChange={(e) => onEditData("address2", e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>電話番号</td>
							<td>
								<input
									type="text"
									value={currentData.phone}
									onChange={(e) => onEditData("phone", e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>品名</td>
							<td>
								<input
									type="text"
									value={currentData.product}
									onChange={(e) => onEditData("product", e.target.value)}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			) : (
				<p>{content}</p>
			)}
			<button onClick={() => clickHandler()}>{buttonContent}</button>
			<button onClick={() => handleCloseModal()}>閉じる</button>
		</Modal>
	);
};

export default ModalComponent;
