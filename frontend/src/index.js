import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import locale from "antd/locale/ru_RU";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ConfigProvider locale={locale}>
		<App />
	</ConfigProvider>
);
