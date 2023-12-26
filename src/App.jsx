import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Data from "./components/Data";
import ModalComponent from "./components/ModalComponent";
import ErrorFallback from "./components/ErrorFallback.tsx";
import Papa from "papaparse";
import ReactFileReader from "react-file-reader";
import Encoding from "encoding-japanese";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
	const [testData, setTestData] = useState(false);
	const [csvData, setCsvData] = useState([]);
	const [convertData, setConvertData] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDownloadModal, setShowDownloadModal] = useState(false);
	const [currentData, setCurrentData] = useState([]);

	useEffect(() => {
		if (csvData.length !== 0) {
			testCsvData(csvData);
			convertCsvData(csvData);
		}
	}, [csvData]);

	const uploadFile = (files) => {
		// Using papaparse to parse the CSV files
		const file = files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const codes = new Uint8Array(e.target.result);
			const encoding = Encoding.detect(codes);
			const unicodeString = Encoding.convert(codes, {
				to: "unicode",
				from: encoding,
				type: "string",
			});

			Papa.parse(unicodeString, {
				complete: (result) => {
					console.log("Finished:", result.data);
					setCsvData(result.data);
				},
				header: false,
			});
		};
		reader.readAsArrayBuffer(file);
	};

	const testCsvData = (csvData) => {
		if (csvData[0][0] === "注文ID" && csvData[1][0].length == 16) {
			setTestData(true);
		} else {
			setTestData(false);
		}
	};

	const convertCsvData = (csvData) => {
		const newData = csvData
			.filter((data) => data[0] !== "" && data[0] !== "注文ID")
			.map((data, i) => {
				return [
					i,
					data[10] + " " + data[11],
					data[13] + data[14],
					data[15],
					data[16],
					data[18],
				];
			});
		setConvertData(newData);
		console.log("newdata: " + newData);
	};

	const deleteData = (id) => {
		const deletedData = convertData.filter((data) => data[0] !== id);
		setConvertData(deletedData);
		handleCloseModal();
	};

	const handleOpenDeleteModal = (data) => {
		setCurrentData(data);
		setShowDeleteModal(true);
	};

	const handleOpenEditModal = (data) => {
		setCurrentData(data);
		setShowEditModal(true);
	};

	const handleOpenDownloadModal = (data) => {
		setShowDownloadModal(true);
	};

	const handleCloseModal = () => {
		setCurrentData([]);
		setShowDeleteModal(false);
		setShowEditModal(false);
		setShowDownloadModal(false);
	};

	return (
		<div id="root">
			<ErrorBoundary fallbackComponent={ErrorFallback}>
				<h1 className="app-title">BASE売上CSV→ゆうパック発送票コンバーター</h1>
				<div className="app-upload">
					<ReactFileReader handleFiles={uploadFile} fileTypes={".csv"}>
						<button>アップロード</button>
					</ReactFileReader>
				</div>
				<Data
					convertData={convertData}
					testData={testData}
					deleteData={deleteData}
					handleOpenEditModal={handleOpenEditModal}
					handleOpenDeleteModal={handleOpenDeleteModal}
					handleOpenDownloadModal={handleOpenDownloadModal}
				/>
				<ModalComponent
					isOpen={showDeleteModal}
					onClose={handleCloseModal}
					handleCloseModal={handleCloseModal}
					deleteData={deleteData}
					currentData={currentData}
					title="削除の確認"
					content="削除しますか?"
					buttonContent="削除"
				/>
				<ModalComponent
					isOpen={showEditModal}
					onClose={handleCloseModal}
					handleCloseModal={handleCloseModal}
					currentData={currentData}
					title="発送情報の編集"
					buttonContent="更新"
				/>
				<ModalComponent
					isOpen={showDownloadModal}
					onClose={handleCloseModal}
					handleCloseModal={handleCloseModal}
					title="ダウンロードの確認"
					content="ダウンロードしますか?"
					buttonContent="ダウンロード"
				/>
			</ErrorBoundary>
		</div>
	);
}

export default App;
