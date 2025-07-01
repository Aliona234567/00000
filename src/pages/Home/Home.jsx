import { useSelector } from "react-redux";
import { Product } from '../../components/Product/Product'
import s from "./Home.module.css";

export function Home() {
    const products = useSelector(state => state.products);

    const newProducts = products.filter(p => p.isNew).slice(0, 3);

    const specialProducts = products.slice(0, 3);

    return (
        <div className={s.container}>
            <div className={s.section}>
                <h2 className={s.sectionTitle}>Наши новинки</h2>
                <div className={s.productsGrid}>
                    {newProducts.map(product => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            isNew={product.isNew}
                            type={product.type}
                            size={product.size}
                            compact={true} 
                        />
                    ))}
                </div>
            </div>

            <div className={s.section}>
                <h2 className={s.sectionTitle}>Наши специальные предложения</h2>
                <div className={s.productsGrid}>
                    {specialProducts.map(product => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            isNew={product.isNew}
                            type={product.type}
                            size={product.size}
                            compact={true}
                        />
                    ))}
                </div>
            </div>
            <div className={s.section}>
                <h2 className={s.sectionTitle}>Актуальные новости</h2>
                <ul className={s.newsList}>
                    <li className={s.newsItem}>
                        <span className={s.newsIcon}>✅</span>
                        Встреча с группой Северный флот 15 июня в нашем магазине
                    </li>
                    <li className={s.newsItem}>
                        <span className={s.newsIcon}>🎁</span>
                        Розыгрыш автографов группы Кипелов среди покупателей
                    </li>
                    <li className={s.newsItem}>
                        <span className={s.newsIcon}>📢</span>
                        Подписывайтесь на соцсети - эксклюзивные скидки для подписчиков
                    </li>
                </ul>
            </div>
        </div>
    );
}