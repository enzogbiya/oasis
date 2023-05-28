import { Button, Card, Col, DatePicker, Form, Input, Row } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
const { TextArea } = Input;

const EditEntryForm = (props) => {
	const [form] = Form.useForm();
	const { handleClose, entry } = props;
	const [isLoadingForm, setIsLoadingForm] = React.useState(false);

	React.useEffect(() => {
		setIsLoadingForm(true);
		form.setFieldsValue({
			fio: entry.fio,
			date: moment(entry.date),
			additionalInfo: entry.info,
		});
		setIsLoadingForm(false);
	}, []);

	const onFinish = async (fieldsValue) => {
		const values = {
			...fieldsValue,
			date: fieldsValue["date"].format("HH:mm DD-MM-YYYY"),
			id: entry.id,
		};

		console.log(values);
		try {
			const result = await axios.put("http://localhost:3001/editRecord", values);
			if (result.data.statusCode === 200) {
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
			console.error("Ошибка изменения записи");
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
		<Card loading={isLoadingForm}>
			<Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
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
							<Button onClick={() => handleClose()}>Отмена</Button>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Сохранить изменения
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default EditEntryForm;
