import React from "react";
import Modal from "react-modal";
import CSVDownloader from "../CSVDownlodaer";

const ModalComponent = ({
	title,
	content,
	isOpen,
	showModal,
	buttonContent,
	deleteData,
	editData,
	convertData,
	currentData,
	setCurrentData,
	handleCloseModal,
}) => {
	const clickHandler = () => {
		if (showModal === "delete") {
			deleteData(currentData.id);
		} else {
			editData(currentData);
		}
	};

	const onEditData = (key, value) => {
		const editedData = {
			...currentData,
			[key]: value,
		};
		setCurrentData(editedData);
		// console.log(currentData);
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
									autoComplete="off"
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
									autoComplete="off"
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
									autoComplete="off"
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
									autoComplete="off"
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
									autoComplete="off"
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
			{showModal === "download" ? (
				<CSVDownloader
					data={convertData}
					filenameprefix="export"
					buttonName="CSVダウンロード"
					handleCloseModal={handleCloseModal}
				/>
			) : (
				<button onClick={() => clickHandler()}>{buttonContent}</button>
			)}
			<button onClick={() => handleCloseModal()}>閉じる</button>
		</Modal>
	);
};

export default ModalComponent;
