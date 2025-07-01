import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Cart/cartSlice";
import s from "./ProductDetail.module.css";

export function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => state.products);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedSize(foundProduct.size);
        } else {
            navigate("/not-found");
        }
    }, [id, products, navigate]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setError("Выберите размер");
            return;
        }
        
        dispatch(addToCart({
            ...product,
            size: selectedSize,
            quantity: quantity
        }));
        
        navigate("/cart");
    };

    const handleQuantityChange = (value) => {
        const newValue = Math.max(1, Math.min(10, value));
        setQuantity(newValue);
    };

    if (!product) {
        return <div className={s.loading}>Загрузка товара...</div>;
    }

    return (
        <div className={s.container}>
            <button onClick={() => navigate(-1)} className={s.backButton}>
                ← Назад
            </button>
            
            <div className={s.productContainer}>
                <div className={s.imageSection}>
                    <div 
                        className={s.mainImage} 
                        style={{ backgroundImage: `url(${product.image})` }}
                    />
                    
                </div>
                
                <div className={s.infoSection}>
                    <div className={s.header}>
                        <h1 className={s.name}>{product.name}</h1>
                        {product.isNew && <span className={s.newBadge}>НОВИНКА</span>}
                    </div>
                    
                    <p className={s.price}>{product.price} ₽</p>
                    
                    <div className={s.description}>
                        <h3>Описание</h3>
                        <p>{product.description}</p>
                    </div>
                    
                    <div className={s.details}>
                        <div className={s.detailItem}>
                            <span>Тип:</span>
                            <span>{product.type}</span>
                        </div>
                        <div className={s.detailItem}>
                            <span>Материал:</span>
                            <span>Хлопок 100%</span>
                        </div>
                        <div className={s.detailItem}>
                            <span>Производитель:</span>
                            <span>Россия</span>
                        </div>
                    </div>
                    
                    <div className={s.sizeSelector}>
                        <h3>Размер:</h3>
                        <div className={s.sizeOptions}>
                            {["S", "M", "L", "XL"].map(size => (
                                <button
                                    key={size}
                                    className={`${s.sizeOption} ${selectedSize === size ? s.selected : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {error && <p className={s.error}>{error}</p>}
                    </div>
                    
                    <div className={s.quantitySelector}>
                        <h3>Количество:</h3>
                        <div className={s.quantityControl}>
                            <button 
                                onClick={() => handleQuantityChange(quantity - 1)}
                                className={s.quantityButton}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className={s.quantityValue}>{quantity}</span>
                            <button 
                                onClick={() => handleQuantityChange(quantity + 1)}
                                className={s.quantityButton}
                                disabled={quantity >= 10}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleAddToCart} 
                        className={s.addToCartButton}
                    >
                        Добавить в корзину
                    </button>
                    
                    <div className={s.additionalInfo}>
                        <div className={s.infoCard}>
                            <h4>Доставка</h4>
                            <p>Бесплатная доставка по России при заказе от 5000₽</p>
                        </div>
                        
                        <div className={s.infoCard}>
                            <h4>Возврат</h4>
                            <p>Возврат товара в течение 14 дней без объяснения причин</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}