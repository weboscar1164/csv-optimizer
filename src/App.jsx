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
	const [showModal, setShowModal] = useState(false);
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
				return {
					id: i,
					name: data[10] + " " + data[11],
					address1: data[13] + data[14],
					address2: data[15],
					phone: data[16],
					product: data[18],
				};
			});
		setConvertData(newData);
		console.log("newdata: " + newData);
	};

	const deleteData = (id) => {
		const deletedData = convertData.filter((data) => data.id !== id);
		setConvertData(deletedData);
		handleCloseModal();
	};

	const editData = (editedData) => {
		console.log("編集しました");
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

	const downloadData = () => {
		console.log("ダウンロードしました");
	};

	const handleOpenDeleteModal = (data) => {
		setCurrentData(data);
		setShowModal("delete");
	};

	const handleOpenEditModal = (data) => {
		setCurrentData(data);
		setShowModal("edit");
	};

	const handleOpenDownloadModal = (data) => {
		setShowModal("download");
	};

	const handleCloseModal = () => {
		setCurrentData([]);
		setShowModal(false);
	};

	return (
		<div id="root">
			<ErrorBoundary fallbackComponent={ErrorFallback}>
				<Header />
				<ReactFileReader
					className="app-upload"
					handleFiles={uploadFile}
					fileTypes={".csv"}
				>
					<button>アップロード</button>
				</ReactFileReader>
				<Data
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
					downloadData={downloadData}
					title="ダウンロードの確認"
					content="ダウンロードしますか?"
					buttonContent="ダウンロード"
				/>
			</ErrorBoundary>
		</div>
	);
}

export default App;
