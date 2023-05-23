import { Card, Col, Row } from "antd";
import axios from "axios";
import React from "react";
import useEntryStore from "../../stores/entriesStore";
import EditEntryForm from "../EditEntryForm/EditEntryForm";
import Entry from "../Entry/Entry";

const EntryList = (props) => {
	const { loading } = props;
	const [isEdited, setIsEdited] = React.useState(false);
	const entries = useEntryStore((state) => state.entries);
	const deleteEntry = useEntryStore((state) => state.deleteEntry);
	const [editedEntry, setEditedEntry] = React.useState({});

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:3001/deleteRecord/${id}`);
			deleteEntry(id);
		} catch (error) {
			console.error("Ошибка удаления", error);
		}
	};

	const handleEdit = async (id) => {
		setIsEdited(true);
		const entry = entries.find((item) => item.id === id);
		setEditedEntry(entry);
	};

	return (
		<Row>
			<Col offset={2} span={entries.length && !loading <= 0 ? 5 : 18}>
				{!isEdited && (
					<Card title="Все записи" loading={loading}>
						<Row gutter={[0, 30]}>
							{entries &&
								entries.map((item) => (
									<Col offset={1} lg={{ span: 12 }} sm={{ span: 20 }} key={item.id}>
										<Entry
											fio={item.fio}
											date={item.date}
											additionalInfo={item.info}
											id={item.id}
											handleDelete={handleDelete}
											handleEdit={handleEdit}
										/>
									</Col>
								))}
						</Row>
						{entries.length <= 0 && !loading && "Записи отсутствуют"}
					</Card>
				)}
				{isEdited && <EditEntryForm entry={editedEntry} handleClose={() => setIsEdited(false)} />}
			</Col>
		</Row>
	);
};

export default EntryList;
