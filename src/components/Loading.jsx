import styles from "../css/Loading.module.css";

// Renders a loading spinner and a loading message
function Loading() {
    return (
        <div className={styles['spinner-container']}>
            <div className={styles['spinner']}></div>
            <div className={styles['loading-text']}>Loading...</div>
        </div>
    );
}
export default Loading;