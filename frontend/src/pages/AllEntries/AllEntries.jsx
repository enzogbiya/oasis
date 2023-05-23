import React, { useEffect } from "react";
import EntryList from "../../components/EntryList/EntryList";
import axios from "axios";
import useEntryStore from "../../stores/entriesStore";

const AllEntries = () => {
	const entries = useEntryStore((state) => state.entries);
	const setEntries = useEntryStore((state) => state.setEntries);

	const [isLoading, setIsLoading] = React.useState(false); // Добавляем объявление переменной isLoading

	useEffect(() => {
		getAllRecords();
	}, []);

	const getAllRecords = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get("http://localhost:3001/getAllRecords");
			const values = res.data.values;
			setEntries(values);
		} catch (error) {
			console.error("Error getting records", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section id="all-entries">
			<EntryList entries={entries} loading={isLoading} />
		</section>
	);
};

export default AllEntries;
