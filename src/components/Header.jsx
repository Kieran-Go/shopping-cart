import { Link, useLocation } from 'react-router-dom';
import styles from '../css/Header.module.css';
import cartIcon from '../assets/svg/cart.svg';

function Header({ cart }) {
  const pages = ["Home", "Shop"]; // Array containing the names of pages for navigation
  const location = useLocation(); // Get the current URL

  // Calculate total number of items in the cart
  let cartCount = 0;
  for(let i = 0; i < cart.length; i++) {
    cartCount += cart[i].quantity;
  }

  return (
    <div className={styles.header}>
      {/* Shop name */}
      <p className={styles['shop-name']}>ShopEase</p>

      {/* Nav section */}
      <section className={styles.nav}>
        {/* Iterate through each page in the pages array and add its value to the navigation section */}
        {pages.map((page) => {
          // Set the "to" path: If the page is "Home", use "" for root path
          const linkTo = page === "Home" ? "/" : `/${page.toLowerCase()}`;

          // Check if the current URL matches the "to" path for active class
          const isActive = location.pathname === linkTo;

          return (
            <Link
              to={linkTo} // Set the correct path
              className={`${styles['nav-link']} ${isActive ? styles['active-nav'] : ''}`} // Conditionally add "active-nav"
              key={page}
            >
              {page}
            </Link>
          );
        })}
      </section>

      {/* Shopping cart section */}
      <div className={styles['cart-container']}>
        <Link to="/checkout" className={styles['cart-link']}>
            <img src={cartIcon} alt="Cart" />
            <p>{cartCount}</p>
        </Link>
      </div>
    </div>
  );
}
export default Header;