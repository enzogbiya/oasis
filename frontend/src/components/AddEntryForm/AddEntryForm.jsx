import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";
import moment from "moment";
import axios from "axios";
import useEntryStore from "../../stores/entriesStore";
import styles from "./AddEntryForm.module.scss";

const { TextArea } = Input;

const AddRecordForm = (props) => {
	const { handleClose } = props;
	const addEntry = useEntryStore((state) => state.addEntry);

	const [loading, setLoading] = React.useState(false);

	const onFinish = async (fieldsValue) => {
		setLoading(true);
		const values = {
			...fieldsValue,
			date: fieldsValue["date"].format("HH:mm DD-MM-YYYY"),
		};

		try {
			const res = await axios.post("http://localhost:3001/addRecord", values);
			console.log(res);
			setLoading(false);
			addEntry(res.data.entry);
			handleClose();
		} catch (error) {
			console.error("Error adding record", error);
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const disabledDate = (current) => {
		const currentDate = moment().startOf("day");
		return current < currentDate;
	};

	return (
		<Form layout="vertical" className={styles.form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
			<Form.Item
				name="fio"
				label="ФИО клиента"
				rules={[
					{
						required: true,
						message: "Необходимо указать ФИО клиента",
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="date"
				label="Выберите дату и время"
				rules={[
					{
						type: "object",
						required: true,
						message: "Необходимо выбрать дату и время записи",
					},
				]}
			>
				<DatePicker showTime format="HH:mm DD-MM-YYYY" disabledDate={disabledDate} />
			</Form.Item>
			<Form.Item name="additionalInfo" label="Дополнительная информация">
				<TextArea showCount maxLength={50} />
			</Form.Item>
			<Row gutter={[15, 0]}>
				<Col>
					<Form.Item>
						<Button onClick={handleClose}>Закрыть</Button>
					</Form.Item>
				</Col>
				<Col>
					<Form.Item>
						<Button loading={loading} type="primary" htmlType="submit">
							Добавить
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default AddRecordForm;
