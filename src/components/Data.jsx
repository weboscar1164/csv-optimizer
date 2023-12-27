import React from "react";
import ReactFileReader from "react-file-reader";
import "./Data.css";

const Data = ({
	uploadFile,
	convertData,
	testData,
	handleOpenEditModal,
	handleOpenDeleteModal,
	handleOpenDownloadModal,
}) => {
	return (
		<div className="app-data-container">
			<div>
				<ReactFileReader handleFiles={uploadFile} fileTypes={".csv"}>
					<button className="app-button app-upload-button">アップロード</button>
				</ReactFileReader>
				{convertData.length == 0 ? (
					<>
						<div className="app-data-empty">
							データをアップロードしてください。
						</div>
						<small>
							いちどExelで読み込んだデータは数値が整形されている可能性があります。
						</small>
					</>
				) : !testData ? (
					<div className="app-data-empty">
						不正なデータです。BASEから取得した売上データを使用してください。
					</div>
				) : (
					<div>
						<button
							className="app-button app-download-button"
							onClick={() => handleOpenDownloadModal()}
						>
							ダウンロード
						</button>
						<table className="app-data-table">
							<tbody>
								<tr>
									<th>氏名</th>
									<th>郵便番号</th>
									<th>住所1</th>
									<th>住所2</th>
									<th>電話番号</th>
									<th>品名</th>
									<th>編集/削除</th>
								</tr>
								{convertData.map((data) => {
									return (
										<tr key={data.id}>
											<td>{data.name}</td>
											<td>{data.addressNum}</td>
											<td>{data.address1}</td>
											<td>{data.address2}</td>
											<td>{data.phone}</td>
											<td>{data.product}</td>
											<td className="app-data-table-button">
												<button
													className="app-button app-edit-button"
													onClick={() => handleOpenEditModal(data)}
												>
													編集
												</button>

												<button
													className="app-button app-delete-button"
													onClick={() => handleOpenDeleteModal(data)}
												>
													削除
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default Data;
