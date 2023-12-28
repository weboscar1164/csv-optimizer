import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorFallback from "./components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => alert("エラーがリセットされました")}
		>
			<HelmetProvider>
				<Helmet>
					<title>BASE-ゆうプリントコンバータ</title>
				</Helmet>
				<App />
			</HelmetProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
