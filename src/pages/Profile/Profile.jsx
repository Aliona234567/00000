import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./profileSlice";
import s from "./Profile.module.css";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser, isAuth } = useSelector(state => state.profile);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!loggedInUser) {
    return <div className={s.loading}>Загрузка профиля...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.profileCard}>
        <div className={s.header}>
          <h2 className={s.title}>Профиль</h2>
          <button onClick={handleLogout} className={s.logoutButton}>
            Выйти
          </button>
        </div>

        <div className={s.userInfo}>
          <div className={s.avatar}>
            <span>{loggedInUser.name.charAt(0)}</span>
          </div>

          <div className={s.details}>
            <h3 className={s.name}>{loggedInUser.name}</h3>
            <p className={s.email}>{loggedInUser.email}</p>
          </div>
        </div>

        <div className={s.section}>
          <h3 className={s.sectionTitle}>История покупок</h3>

          {loggedInUser.paidItems && loggedInUser.paidItems.length > 0 ? (
            <div className={s.purchases}>
              {loggedInUser.paidItems.map((item, index) => (
                <div key={index} className={s.purchaseItem}>
                  <div className={s.purchaseInfo}>
                    <h4 className={s.itemName}>{item.name}</h4>
                    <p className={s.itemDetails}>
                      {item.quantity} × {item.price} ₽ = {item.quantity * item.price} ₽
                    </p>
                    <p className={s.itemDate}>Дата: {item.date || "Неизвестно"}</p>
                  </div>
                  <div className={s.itemPrice}>{item.quantity * item.price} ₽</div>
                </div>
              ))}
            </div>
          ) : (
            <p className={s.emptyMessage}>У вас пока нет покупок</p>
          )}
        </div>

        <div className={s.actions}>
          <Link to="/" className={s.actionButton}>
            На главную
          </Link>
          <Link to="/products" className={s.actionButton}>
            Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
}