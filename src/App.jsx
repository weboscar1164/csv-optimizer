import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Data from "./components/Data";
import ModalComponent from "./components/ModalComponent";
import ErrorFallback from "./components/ErrorFallback.tsx";
import Papa from "papaparse";
import Encoding from "encoding-japanese";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "react-modal";
import { Helmet } from "react-helmet";

Modal.setAppElement("#root");

function App() {
	const [testData, setTestData] = useState(false);
	const [csvData, setCsvData] = useState([]);
	const [convertData, setConvertData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [currentData, setCurrentData] = useState([]);

	useEffect(() => {
		// 適正データかどうか確認してブラウザ上で確認できるデータに変換
		if (csvData.length !== 0) {
			testCsvData(csvData);
			convertCsvData(csvData);
		}
	}, [csvData]);

	const uploadFile = (files) => {
		// unicodeに変換
		const file = files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const codes = new Uint8Array(e.target.result);
			const encoding = Encoding.detect(codes);
			console.log("文字コード: " + encoding);
			const unicodeString = Encoding.convert(codes, {
				to: "UNICODE",
				from: encoding,
				type: "string",
			});

			// 変換されたCSVファイルをpapaparseでパース
			Papa.parse(unicodeString, {
				complete: (result) => {
					// console.log("Finished:", result.data);
					setCsvData(result.data);
				},
				header: false,
			});
		};
		reader.readAsArrayBuffer(file);
	};

	const testCsvData = (csvData) => {
		// BASEからの売上データであることを確認
		if (csvData[0][0] === "注文ID" && csvData[1][0].length == 16) {
			setTestData(true);
		} else {
			setTestData(false);
		}
	};

	const convertCsvData = (csvData) => {
		// ゆうプリントRで使用するデータを抽出・整形
		const newData = csvData
			.filter((data) => data[0] !== "" && data[0] !== "注文ID")
			.map((data, i) => {
				return {
					id: i,
					name: data[10] + " " + data[11],
					addressNum: data[12],
					address1: data[13] + data[14],
					address2: data[15],
					phone: data[16],
					product: data[18],
				};
			});
		setConvertData(newData);
	};

	const deleteData = (id) => {
		const deletedData = convertData.filter((data) => data.id !== id);
		setConvertData(deletedData);
		handleCloseModal();
	};

	const editData = (editedData) => {
		const updatedData = convertData.map((data) => {
			if (data.id === editedData.id) {
				return editedData;
			} else {
				return data;
			}
		});
		setConvertData(updatedData);
		handleCloseModal();
	};

	const handleOpenDeleteModal = (data) => {
		setCurrentData(data);
		setShowModal("delete");
	};

	const handleOpenEditModal = (data) => {
		setCurrentData(data);
		setShowModal("edit");
	};

	const handleOpenDownloadModal = () => {
		setShowModal("download");
	};

	const handleCloseModal = () => {
		setCurrentData([]);
		setShowModal(false);
	};

	return (
		<div id="root">
			<ErrorBoundary fallbackComponent={ErrorFallback}>
				<Helmet>
					<title>BASE-ゆうプリントコンバータ</title>
				</Helmet>
				<Header />
				<Data
					uploadFile={uploadFile}
					convertData={convertData}
					testData={testData}
					handleOpenEditModal={handleOpenEditModal}
					handleOpenDeleteModal={handleOpenDeleteModal}
					handleOpenDownloadModal={handleOpenDownloadModal}
				/>
				<ModalComponent
					isOpen={showModal === "delete"}
					showModal={showModal}
					onClose={handleCloseModal}
					handleCloseModal={handleCloseModal}
					deleteData={deleteData}
					currentData={currentData}
					setCurrentData={setCurrentData}
					title="削除の確認"
					content="削除しますか?"
					buttonContent="削除"
				/>
				<ModalComponent
					isOpen={showModal === "edit"}
					showModal={showModal}
					onClose={handleCloseModal}
					handleCloseModal={handleCloseModal}
					editData={editData}
					currentData={currentData}
					setCurrentData={setCurrentData}
					title="発送情報の編集"
					buttonContent="更新"
				/>
				<ModalComponent
					isOpen={showModal === "download"}
					showModal={showModal}
					onClose={handleCloseModal}
					handleCloseModal={handleCloseModal}
					convertData={convertData}
					title="ダウンロードの確認"
					content="ダウンロードしますか?"
					buttonContent="ダウンロード"
				/>
			</ErrorBoundary>
		</div>
	);
}

export default App;
