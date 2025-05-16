import styles from "../page.module.css";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<div className={styles.gridcontent}>
				<Link href={"/"}>
					<span className='material-symbols-outlined'>home</span>
				</Link>
				<Link href={"/"}>
					<span className='material-symbols-outlined'>calendar_month</span>
				</Link>
			</div>
			<div className={styles.usercontent}>
				<span className={`material-symbols-outlined ${styles.icons}`}>notifications</span>
			</div>
		</nav>
	);
}
