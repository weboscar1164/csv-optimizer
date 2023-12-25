import React from "react";

const Header = () => {
	return (
		<div className="header-container">
			<h1 className="header-title">CSVゆうプリントコンバーター</h1>
			<div className="header-input">
				<input
					type="file"
					id=""
					onChange={(e) => onInportFile(e.target.value)}
				/>
				<button>変換</button>
			</div>
		</div>
	);
};

export default Header;
