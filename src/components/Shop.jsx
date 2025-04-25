import { useOutletContext } from "react-router-dom";

function Shop() {

    const { cart, setCart } = useOutletContext();
    return (<>
        <p>Shop Page</p>
        <p>{cart.length}</p>
    </>
    );
}
export default Shop;