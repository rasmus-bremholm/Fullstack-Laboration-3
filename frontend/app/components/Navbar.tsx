import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "./LoginButton";
import { HomeIcon, CalendarIcon, NotificationIcon } from "../icons/icons";

export default function Navbar() {
	const placeholderUser = {
		first_name: "Rasmus",
		profile_picture: "/images/default-avatar.png",
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.gridcontent}>
				<Link href={"/"}>
					<HomeIcon className={styles.icons} />
				</Link>
				<Link href={"/schedule"}>
					<CalendarIcon className={styles.icons} />
				</Link>
			</div>
			<div className={styles.usercontent}>
				<NotificationIcon className={styles.icons} />
				<LoginButton />
				<Link href={"/profile"}>
					<Image className={styles.icons} src={placeholderUser.profile_picture} alt={`${placeholderUser.first_name} avatar`} width={20} height={20} />
				</Link>
			</div>
		</nav>
	);
}
