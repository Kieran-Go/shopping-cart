import styles from '../css/Home.module.css';
import { Link } from 'react-router-dom';
import truckIcon from '../assets/svg/truck.svg';
import starIcon from '../assets/svg/star.svg';
import returnIcon from '../assets/svg/return.svg';

function Home() {

    const services = [
        {icon: truckIcon, title: "Free Shipping", text: "Enjoy free shipping on all orders over $50"},
        {icon: starIcon, title: "Top Quality", text: "Curated products from premium brands"},
        {icon: returnIcon, title: "Easy Returns", text: "30-day hassle-free return policy"}
    ]

    return (<div className={styles['home']}>
        {/* Home Title */}
        <h1>Welcome to <span>ShopEase</span></h1>

        {/* Blurb */}
        <p className={styles['blurb']}>Discover our amazing collection of high-quality products.
             From electronics to fashion, we have something for everyone!
        </p>

        {/* 'Shop Now' button/link */}
        <Link to={"shop"} className={styles['shop-button']}>
            Shop Now!
        </Link>

        {/* Services section */}
        <div className={styles['services-grid']}>
            {services.map((service) => {
                return (
                    <div className={styles['service']}>
                        <img src={service.icon}></img>
                        <h3>{service.title}</h3>
                        <p>{service.text}</p>
                    </div>
                )
            })}
        </div>
    </div>
    );
}
export default Home;