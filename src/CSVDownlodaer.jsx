import * as React from "react";
import Encoding from "encoding-japanese";
import { unparse } from "papaparse";
import "./components/ModalComponent.css";

//現在日時取得関数 YYYYMMDDHHMMMのフォーマットで現在日時を取得、ファイル名のsuffixとして付ける
const padZero = (num) => {
	return (num < 10 ? "0" : "") + num;
};
const getCurrentDatetime = () => {
	const now = new Date();
	return (
		"" +
		now.getFullYear() +
		padZero(now.getMonth() + 1) +
		padZero(now.getDate()) +
		padZero(now.getHours()) +
		padZero(now.getMinutes())
	);
};

//CSVダウンロード関数　呼び出されるときに、パラメータとしてファイル名prefix、ボタン名、JSONデータをもらう
const CSVDownloader = ({
	filenameprefix,
	data,
	handleCloseModal,
	buttonName,
}) => {
	const filename = filenameprefix + "_" + getCurrentDatetime();

	const handleButtonClick = () => {
		// ヘッダーを無効にしてCSVを生成
		const csv = unparse(data, { header: false, delimiter: "," });

		// shift-jisに変換
		const unicodeList = [];
		for (let i = 0; i < csv.length; i += 1) {
			unicodeList.push(csv.charCodeAt(i));
		}
		const sjisArray = Encoding.convert(unicodeList, {
			to: "SJIS",
			from: "UNICODE",
		});
		const sjisCsvString = new Uint8Array(sjisArray);

		// CSVをダウンロード
		const blob = new Blob([sjisCsvString], {
			type: "text/csv; charset=iso-8859-1",
		});
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = `${filename}.csv`;
		link.click();

		handleCloseModal();
	};
	return (
		<button
			className="app-modal-button app-modal-action-button"
			onClick={handleButtonClick}
		>
			{buttonName}
		</button>
	);
};

export default CSVDownloader;
