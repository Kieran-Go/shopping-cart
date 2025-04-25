import styles from '../css/Header.module.css';

// Renders the Header component
function Header({ pages, pageState, setPageState, cart }) {
    return (
        <div className={styles.header}>
            {/* Shop name */}
            <p className={styles['shop-name']}>ShopEase</p>

            {/* Nav section */}
            <section className={styles.nav}> 
                {/* Iterate through each page in the pages array and add its value to the navigation section */}
                {pages.map((page) => (
                    <p className={`${styles['nav-link']} ${page === pageState ? styles['active-nav'] : ''}`} // Conditionally assign active-nav class
                        key={page} onClick={() => setPageState(page)}>
                        {page}
                    </p>
                ))}
            </section>

            {/* Shopping cart section */}
            <div className={styles['cart-container']}>
                <p>Cart</p>
                <p>{cart.length}</p>
            </div>
        </div>
    );
}
export default Header;