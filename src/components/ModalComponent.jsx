import React from "react";
import Modal from "react-modal";
import CSVDownloader from "../CSVDownlodaer";
import "./ModalComponent.css";

const customStyles = {
	content: {
		top: "30%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		minWidth: "40%",
		background: "#8ac3d7",
		border: "none",
	},
};
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
		// 編集と削除でそれぞれボタン機能を付与
		//ダウンロードは別のボタンを作成
		if (showModal === "delete") {
			deleteData(currentData.id);
		} else {
			editData(currentData);
		}
	};

	const onEditData = (key, value) => {
		// currentDataを逐次更新してupdateの準備
		const editedData = {
			...currentData,
			[key]: value,
		};
		setCurrentData(editedData);
	};

	const renderContent = () => {
		if (showModal === "edit" && currentData) {
			return (
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
							<td>郵便番号</td>
							<td>
								<input
									type="text"
									autoComplete="off"
									value={currentData.addressNum}
									onChange={(e) => onEditData("addressNum", e.target.value)}
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
			);
		} else if (showModal === "delete" && currentData) {
			return (
				<>
					<p>{currentData.name}さんの</p>
					<p>データを削除しますか?</p>
				</>
			);
		} else {
			return <p>ダウンロードしますか？</p>;
		}
	};

	return (
		<Modal isOpen={isOpen} contentLabel="Example Modal" style={customStyles}>
			<div className="app-modal-container">
				<h2>{title}</h2>
				{renderContent()}
				{showModal === "download" ? (
					<CSVDownloader
						data={convertData}
						filenameprefix="export"
						buttonName="CSVダウンロード"
						handleCloseModal={handleCloseModal}
					/>
				) : (
					<button
						className="app-modal-button app-modal-action-button"
						onClick={() => clickHandler()}
					>
						{buttonContent}
					</button>
				)}
				<button
					className="app-modal-button app-modal-close-button"
					onClick={() => handleCloseModal()}
				>
					閉じる
				</button>
			</div>
		</Modal>
	);
};

export default ModalComponent;
