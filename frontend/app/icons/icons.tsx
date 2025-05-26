import { SVGProps } from "react";
import styles from "../page.module.css";

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<div className={styles.iconwrapper}>
			<svg {...props} xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'>
				<path d='M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z' />
			</svg>
		</div>
	);
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<div className={styles.iconwrapper}>
			<svg {...props} xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'>
				<path d='M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z' />
			</svg>
		</div>
	);
}

export function NotificationIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<div className={styles.iconwrapper}>
			<svg {...props} xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'>
				<path d='M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z' />
			</svg>
		</div>
	);
}

export function LoginIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<div className={styles.iconwrapper}>
			<svg {...props} xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'>
				<path d='M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z' />
			</svg>
		</div>
	);
}

export function LogoutIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<div className={styles.iconwrapper}>
			<svg {...props} xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'>
				<path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z' />
			</svg>
		</div>
	);
}

export function SubmitIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'>
			<path d='M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z' />
		</svg>
	);
}

export function EditIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<div className={styles.iconwrapper}>
			<svg {...props} xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'>
				<path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
			</svg>
		</div>
	);
}

export function DeleteStudent(props: SVGProps<SVGSVGElement>) {
	return (
		<div className={styles.iconwrapper}>
			<svg {...props} xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'>
				<path d='M791-55 686-160H160v-112q0-34 17.5-62.5T224-378q45-23 91.5-37t94.5-21L55-791l57-57 736 736-57 57ZM240-240h366L486-360h-6q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm496-138q29 14 46 42.5t18 61.5L666-408q18 7 35.5 14t34.5 16ZM568-506l-59-59q23-9 37-29.5t14-45.5q0-33-23.5-56.5T480-720q-25 0-45.5 14T405-669l-59-59q23-34 58-53t76-19q66 0 113 47t47 113q0 41-19 76t-53 58Zm38 266H240h366ZM457-617Z' />
			</svg>
		</div>
	);
}
