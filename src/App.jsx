import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Data from "./components/Data";
import Papa from "papaparse";
import ReactFileReader from "react-file-reader";
import Encoding from "encoding-japanese";

function App() {
	const [csvData, setCsvData] = useState([]);
	const [convertData, setConvertData] = useState([]);

	useEffect(() => {
		convertCsvData(csvData);
		console.log(convertData);
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

	const convertCsvData = (csvData) => {
		const newData = csvData.map((data, i) => {
			return [
				i,
				data[10] + data[11],
				data[13] + data[14],
				data[15],
				data[16],
				data[18],
			];
		});
		setConvertData(newData);
	};
	return (
		<>
			<h1 className="app-title">CSVゆうプリントコンバーター</h1>
			<div className="app-upload">
				<ReactFileReader handleFiles={uploadFile} fileTypes={".csv"}>
					<button>アップロード</button>
				</ReactFileReader>
			</div>
			<Data convertData={convertData}></Data>
		</>
	);
}

export default App;
