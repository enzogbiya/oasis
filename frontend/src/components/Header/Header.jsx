import React from "react";
import { Col, Row, Typography } from "antd";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";
import AddRecordButton from "../AddEntryButton/AddEntryButton";

const { Title } = Typography;

const Header = () => {
	return (
		<header id="header" className={styles.header}>
			<Row align="middle">
				<Col offset={2} sm={{ span: 8 }} xs={{ span: 12 }}>
					<Title level={2}>Оазис сияния</Title>
				</Col>
				<Col sm={{ span: 7 }} xs={{ span: 6 }}>
					<Menu />
				</Col>
				<Col sm={{ span: 5, offset: 0 }} xs={{ span: 10, offset: 2 }}>
					<AddRecordButton>Добавить запись</AddRecordButton>
				</Col>
			</Row>
		</header>
	);
};

export default Header;
