import styles from "../styles/modal.module.css";

export function EditModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	if (!isOpen) return null;

	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Edit Student</h2>
				<form action=''></form>
			</div>
		</div>
	);
}

export function DeleteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	if (!isOpen) return null;
	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Delete Student?</h2>
				<p>Are you sure you want to delete your account?</p>
				<div className={styles.buttoncontainer}>
					<button>Yes</button>
					<button>Also Yes</button>
				</div>
			</div>
		</div>
	);
}
