import React from "react";

const Data = ({
	convertData,
	testData,
	handleOpenEditModal,
	handleOpenDeleteModal,
	handleOpenDownloadModal,
}) => {
	return (
		<div className="app-data-container">
			{convertData.length == 0 ? (
				<div className="app-data-empty">データをアップロードしてください。</div>
			) : !testData ? (
				<div>
					不正なデータです。BASEから取得した売上データを使用してください。
				</div>
			) : (
				<div>
					<button onClick={() => handleOpenDownloadModal()}>
						ダウンロード
					</button>
					<table className="app-data-table">
						<tbody>
							<tr>
								<th>氏名</th>
								<th>住所1</th>
								<th>住所2</th>
								<th>電話番号</th>
								<th>品名</th>
								<th></th>
								<th></th>
							</tr>
							{convertData.map((data) => {
								return (
									<tr key={data.id}>
										<td>{data.name}</td>
										<td>{data.address1}</td>
										<td>{data.address2}</td>
										<td>{data.phone}</td>
										<td>{data.product}</td>
										<td>
											<button onClick={() => handleOpenEditModal(data)}>
												修正
											</button>
										</td>
										<td>
											<button onClick={() => handleOpenDeleteModal(data)}>
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
	);
};

export default Data;
