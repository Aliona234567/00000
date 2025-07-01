import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, clearCart, removeFromCart, updateQuantity } from "../Cart/cartSlice";
import { addPaidItems } from "../Profile/profileSlice";
import s from "./Cart.module.css";

export function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart);
    const { isAuth, loggedInUser } = useSelector(state => state.profile);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(newTotal);
    }, [cartItems]);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity >= 1) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        if (!isAuth) {
            navigate("/login");
            return;
        }

        const purchaseItems = cartItems.map(item => ({
            ...item,
            date: new Date().toLocaleDateString()
        }));
        
        dispatch(addPaidItems(purchaseItems));
        dispatch(clearCart());
        navigate("/profile");
    };

    if (cartItems.length === 0) {
        return (
            <div className={s.emptyContainer}>
                <h2 className={s.emptyTitle}>Ваша корзина пуста</h2>
                <p className={s.emptyText}>Добавьте товары, чтобы продолжить покупки</p>
                <Link to="/products" className={s.continueButton}>
                    Перейти к товарам
                </Link>
            </div>
        );
    }

    return (
        <div className={s.container}>
            <h2 className={s.title}>Ваша корзина</h2>
            
            <div className={s.cartItems}>
                {cartItems.map(item => (
                    <div key={item.id} className={s.cartItem}>
                        <div className={s.itemImageContainer}>
                            <img src={item.image} alt={item.name} className={s.itemImage} />
                        </div>
                        
                        <div className={s.itemDetails}>
                            <h3 className={s.itemName}>{item.name}</h3>
                            <p className={s.itemSize}>Размер: {item.size}</p>
                            <p className={s.itemPrice}>{item.price} ₽ × {item.quantity} = {item.price * item.quantity} ₽</p>
                        </div>
                        
                        <div className={s.itemActions}>
                            <div className={s.quantityControl}>
                                <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className={s.quantityButton}
                                >
                                    -
                                </button>
                                <span className={s.quantityValue}>{item.quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className={s.quantityButton}
                                >
                                    +
                                </button>
                            </div>
                            
                            <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className={s.removeButton}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className={s.summary}>
                <div className={s.totalContainer}>
                    <span className={s.totalLabel}>Итого:</span>
                    <span className={s.totalAmount}>{total} ₽</span>
                </div>
                
                <div className={s.checkoutContainer}>
                    <button onClick={handleCheckout} className={s.checkoutButton}>
                        Оформить заказ
                    </button>
                    
                    <button 
                        onClick={() => dispatch(clearCart())} 
                        className={s.clearButton}
                    >
                        Очистить корзину
                    </button>
                </div>
                
                {!isAuth && (
                    <p className={s.authWarning}>
                        Для оформления заказа необходимо <Link to="/login" className={s.authLink}>войти</Link>
                    </p>
                )}
            </div>
        </div>
    );
}