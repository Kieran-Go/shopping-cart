import { useOutletContext } from "react-router-dom";
import useFetchItems from "../hooks/useFetchItems";
import styles from "../css/Shop.module.css";
import Loading from "./Loading";

function Shop() {
    const { cart, setCart } = useOutletContext();
    const {items, loading, error} = useFetchItems("https://fakestoreapi.com/products/");

    if (loading) return <Loading />;
    if(error) return <p>A network error has occurred. Please try again later.</p>;

    console.log(items);

    return (<div className={styles['shop-page']}>
        <h1>Our Products</h1>
        <p>Browse our collection of high-quality items.</p>
    </div>
    );
}
export default Shop;