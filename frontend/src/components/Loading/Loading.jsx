import { Spin, Space } from "antd";
import React from "react";

const Loading = () => {
	return (
		<Space
			direction="vertical"
			style={{
				width: "100%",
				height: "100vh",
				justifyContent: "center",
			}}
		>
			<Spin tip="Загрузка страницы..." size="large">
				<div className="content" />
			</Spin>
		</Space>
	);
};

export default Loading;
