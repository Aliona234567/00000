import { useState } from "react";
import { useSelector } from "react-redux";
import { Product } from '../../components/Product/Product'
import s from "./Products.module.css";

export function Products() {
    const products = useSelector(state => state.products);
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: "Все товары" },
        { id: "tshirt", name: "Футболки" },
        { id: "jacket", name: "Куртки" },
        { id: "accessory", name: "Аксессуары" },
        { id: "other", name: "Другое" }
    ];

    const filteredProducts = activeCategory === "all"
        ? products
        : products.filter(product => product.type === activeCategory);

    return (
        <div className={s.container}>
            <h1 className={s.title}>Наши товары</h1>

            <div className={s.categories}>
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`${s.categoryButton} ${activeCategory === category.id ? s.active : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className={s.productsGrid}>
                {filteredProducts.map(product => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        description={product.description}
                        isNew={product.isNew}
                        type={product.type}
                        size={product.size}
                    />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className={s.emptyMessage}>
                    <p>Товары в этой категории временно отсутствуют</p>
                    <button
                        className={s.showAllButton}
                        onClick={() => setActiveCategory("all")}
                    >
                        Показать все товары
                    </button>
                </div>
            )}
        </div>
    );
}