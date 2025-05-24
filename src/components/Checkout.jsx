import { useOutletContext, Link } from "react-router-dom";
import styles from '../css/Checkout.module.css';

const emptyCart = () => {
    return (
        <div className={styles['checkout-page']}>
            <h1>Your cart is empty!</h1>
            <p style={{ marginBottom: '40px' }}>Add some products to your cart before checkout.</p>
            <Link to="/shop" className={styles['shop-btn-container']}>
                <button className={styles['shop-btn']}>Continue Shopping</button>
            </Link>
        </div>
    );
};

function Checkout() {
    const { cart, setCart } = useOutletContext();
    if (cart.length <= 0) return emptyCart();

    // Calculate total cost of items in cart
    let totalCost = 0;
    for(let i = 0; i < cart.length; i++) {
        totalCost += (cart[i].item.price * cart[i].quantity);
    }

    const removeFromCart = (index) => {
        const updatedCart = [...cart]; // clone the cart to avoid mutating state directly
    
        if (updatedCart[index].quantity > 1)  updatedCart[index].quantity -= 1; // reduce quantity by 1 if quantity is greater than 1
        else updatedCart.splice(index, 1); // remove the item entirely if quantity is 1
    
        setCart(updatedCart);
    };
    

    return (
        <div className={styles['checkout-page']}>
            <h1>Checkout</h1>
            
            <div className={styles['content']}>
            <div className={styles['order-summary-container']}>
                    <h3>Order Summary</h3>
                    {cart.map((product, index) => (
                        <div key={index} className={styles['order-item']}>
                            <img src={product.item.image} alt={product.item.title} className={styles['item-image']} />
                            <span className={styles['item-quantity']}>Qty: {product.quantity}</span>
                            <span className={styles['item-title']}>{product.item.title}</span>
                            <span className={styles['item-price']}>${(product.item.price * product.quantity).toFixed(2)}</span>
                            <button 
                                className={styles['remove-btn']} 
                                onClick={() => removeFromCart(index)}
                                aria-label={`Remove ${product.item.title}`}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <p className={styles['total']}>Total: ${totalCost}</p>
                </div>

                <form className={styles['checkout-form']}>
                    <fieldset>
                        <legend>Customer Information</legend>
                        <label>
                            Full Name:
                            <input type="text" name="fullName" required />
                        </label>
                        <label>
                            Email Address:
                            <input type="email" name="email" required />
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend>Shipping Address</legend>
                        <label>
                            Street Address:
                            <input type="text" name="street" required />
                        </label>
                        <label>
                            City:
                            <input type="text" name="city" required />
                        </label>
                        <label>
                            ZIP Code:
                            <input type="text" name="zip" required />
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend>Payment Information</legend>
                        <label>
                            Card Number:
                            <input type="text" name="cardNumber" required />
                        </label>
                        <label>
                            Expiration Date:
                            <input type="text" name="expiration" placeholder="MM/YY" required />
                        </label>
                        <label>
                            CVV:
                            <input type="text" name="cvv" required />
                        </label>
                    </fieldset>
                    <button type="submit">Place Order</button>
                </form>
            </div>
        </div>
    );
}
export default Checkout;