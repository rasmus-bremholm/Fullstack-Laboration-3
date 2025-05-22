import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "./LoginButton";

export default function Navbar() {
	const placeholderUser = {
		first_name: "Rasmus",
		profile_picture: "/images/default-avatar.png",
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.gridcontent}>
				<Link href={"/"}>
					<span className='material-symbols-outlined'>home</span>
				</Link>
				<Link href={"/schedule"}>
					<span className='material-symbols-outlined'>calendar_month</span>
				</Link>
			</div>
			<div className={styles.usercontent}>
				<span className={`material-symbols-outlined ${styles.icons}`}>notifications</span>
				<LoginButton />
				<Link href={"/profile"}>
					<Image className={styles.icons} src={placeholderUser.profile_picture} alt={`${placeholderUser.first_name} avatar`} width={20} height={20} />
				</Link>
			</div>
		</nav>
	);
}
