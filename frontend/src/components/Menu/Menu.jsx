import React from "react";
import { Typography } from "antd";
import styles from "./Menu.module.scss";
const { Link } = Typography;
const Menu = () => {
	return (
		<div id="menu">
			<ul className={styles.menuItems}>
				<li>
					<Link href="/">Все записи</Link>
				</li>
			</ul>
		</div>
	);
};

export default Menu;
