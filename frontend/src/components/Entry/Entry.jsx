import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Card } from "antd";
import moment from "moment";
import React from "react";

const { Meta } = Card;

const Entry = (props) => {
	const { fio, date, additionalInfo, id, handleDelete, handleEdit } = props;

	return (
		<Card
			actions={[
				<EditTwoTone onClick={() => handleEdit(id)} />,
				<DeleteTwoTone twoToneColor="#eb2f96" onClick={() => handleDelete(id)} />,
			]}
		>
			<Meta
				title={`${moment.utc(date).format("HH:mm DD-MM-YYYY")} ${fio}`}
				description={`${additionalInfo ? additionalInfo : "Дополнительная информация отсутствует"}`}
			/>
		</Card>
	);
};

export default Entry;
