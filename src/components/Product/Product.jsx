import { Link } from "react-router-dom";
import s from "./Product.module.css";

export function Product({ id, name, price, image, description, isNew, type }) {

    const typeNames = {
        "tshirt": "Футболка",
        "jacket": "Куртка",
        "accessory": "Аксессуар",
        "other": "Другое"
    };
    
    return (
        <div className={s.card}>
            {isNew && <div className={s.newBadge}>НОВИНКА</div>}
            <div className={s.imageContainer}>
                <img className={s.image} src={image} alt={name} />
            </div>
            <div className={s.info}>
                <p className={s.type}>{typeNames[type] || type}</p>
                <h3 className={s.name}>{name}</h3>
                <p className={s.description}>{description}</p>
                <div className={s.details}>
                    <p className={s.price}>{price} ₽</p>
                </div>
                <Link to={`/product/${id}`} className={s.detailsButton}>
                    Подробнее
                </Link>
            </div>
        </div>
    );
}