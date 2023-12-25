import React from "react";

const Data = ({ convertData }) => {
	return (
		<div className="app-data-container">
			{convertData.length == 0 ? (
				<div className="app-data-empty">データをアップロードしてください。</div>
			) : (
				<table className="app-data-table">
					<tbody>
						<tr>
							<th>氏名</th>
							<th>住所1</th>
							<th>住所2</th>
							<th>電話番号</th>
							<th>品名</th>
							<th></th>
						</tr>
						{convertData.map((data) => {
							return (
								<tr key={data[0]}>
									<td>
										<input type="text" value={data[1]} />
									</td>
									<td>
										<input type="text" value={data[2]} />
									</td>
									<td>
										<input type="text" value={data[3]} />
									</td>
									<td>
										<input type="text" value={data[4]} />
									</td>
									<td>
										<input type="text" value={data[5]} />
									</td>
									<td>
										<button>削除</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Data;
