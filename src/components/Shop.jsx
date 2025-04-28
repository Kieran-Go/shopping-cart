import { useOutletContext } from "react-router-dom";
import useFetchItems from "../hooks/useFetchItems";
import styles from "../css/Shop.module.css";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import capitalizeFirstLetter from "../scripts/capitalizeFirstLetter";

function Shop() {
    const { setCart } = useOutletContext();
    const { items, loading, error } = useFetchItems("https://fakestoreapi.com/products/");
    const [searchValue, setSearchValue] = useState('');
    const [catValue, setCatValue] = useState('All Categories');    
    const [quantities, setQuantities] = useState({}); // Store quantity state for each product

    // Create an array of all item categories
    const itemCategories = [];
    for(let i = 0; i < items.length; i++) {
        const cat = capitalizeFirstLetter(items[i].category);
        if(!itemCategories.includes(cat)) itemCategories.push(cat);
    }

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    // Handle category selection change
    const handleCategoryChange = (e) => {
        setCatValue(e.target.value);
    };

    // Decide whether to render item based on filter settings
    const filterItems = (item) => {
        const matchesSearch = searchValue === "" || item.title.toLowerCase().includes(searchValue.toLowerCase());
        const matchesCategory = catValue === "All Categories" || item.category.toLowerCase() === catValue.toLowerCase();
        return matchesSearch && matchesCategory;
    };

    // Handle the quantity change for a product
    const handleQuantityChange = (itemId, type) => {
        setQuantities((prevQuantities) => {
            const currentQty = prevQuantities[itemId] || 1;
            if (type === "increment") return { ...prevQuantities, [itemId]: currentQty + 1 };
            else if (type === "decrement" && currentQty > 0) return { ...prevQuantities, [itemId]: currentQty - 1 };
            return prevQuantities;
        });
    };

    // Add item to the cart
    const addToCart = (item) => {
        const quantityToAdd = quantities[item.id] || 1;
    
        setCart((prevCart) => {
            // Find if item already exists in cart
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.item.id === item.id);
    
            if (existingItemIndex !== -1) {
                // If it exists, create a new array with updated quantity
                return prevCart.map((cartItem, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + quantityToAdd,
                        };
                    }
                    return cartItem;
                });
            } else {
                // If not, add the new item with quantity
                return [...prevCart, { item, quantity: quantityToAdd }];
            }
        });
    };
    
    if (loading) return <Loading />;
    if(error) return <p>A network error has occurred. Please try again later.</p>;
    if (!items || items.length === 0) return <p>No products available at the moment.</p>;

    return (
        <div className={styles['shop-page']}>

            <div className={styles['shop-head']}>
                <h1>Our Products</h1>
                <p>Browse our collection of high-quality items.</p>
            </div>

            <div className={styles['filters-container']}>
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className={styles['search-bar']}
                />

                {/* Category Dropdown */}
                <select
                    value={catValue}
                    onChange={handleCategoryChange}
                    className={styles['category-dropdown']}
                >
                    <option value="All Categories">All Categories</option>
                    {itemCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Products list */}
            <div className={styles['products-grid']}>
                {items.map((item) => {
                    if (filterItems(item)) {
                        return (
                            <div className={styles['product']} key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <p className={styles['category']}>{capitalizeFirstLetter(item.category)}</p>
                                <h3>{item.title}</h3>
                                <p className={styles['price']}>${item.price}</p>

                                {/* Quantity Container */}
                                <div className={styles['quantity-container']}>
                                    <button className={styles['quantity-btn']} onClick={() => handleQuantityChange(item.id, 'decrement')}>-</button>
                                    <p className={styles['qty']}>{quantities[item.id] || 1}</p>
                                    <button className={styles['quantity-btn']} onClick={() => handleQuantityChange(item.id, 'increment')}>+</button>
                                </div>

                                {/* Add to Cart Button */}
                                <button className={styles['add-to-cart-btn']} onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
export default Shop;