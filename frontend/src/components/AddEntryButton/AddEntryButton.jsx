import { DiffTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Typography } from "antd";
import React from "react";

import AddRecordForm from "../AddEntryForm/AddEntryForm";
import styles from "./AddEntryButton.module.scss";

const { Title } = Typography;

const AddRecordButton = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button type="primary" open={isModalOpen} onClick={showModal} icon={<PlusOutlined />}>
				{children}
			</Button>
			<Modal
				title={
					<Row align="middle" gutter={[10, 0]}>
						<Col>
							<DiffTwoTone />
						</Col>
						<Col>
							<Title level={4} className={styles.title}>
								Добавление новой записи
							</Title>
						</Col>
					</Row>
				}
				open={isModalOpen}
				onCancel={handleClose}
				footer={[]}
			>
				<AddRecordForm handleClose={handleClose} />
			</Modal>
		</>
	);
};

export default AddRecordButton;
