import React from "react";

const Data = ({ convertData, testData, deleteData }) => {
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
					<button>ダウンロード</button>
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
									<tr key={data[0]}>
										<td>{data[1]}</td>
										<td>{data[2]}</td>
										<td>{data[3]}</td>
										<td>{data[4]}</td>
										<td>{data[5]}</td>
										<td>
											<button>修正</button>
										</td>
										<td>
											<button onClick={() => deleteData(data[0])}>削除</button>
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
