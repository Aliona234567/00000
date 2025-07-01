import s from "./Header.module.css";
import { Link } from "react-router-dom";
import ShoppingCart from '../../assets/ShoppingCart.png';
import Profile from '../../assets/profile.png';
import Products from '../../assets/Products.png'
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export function Header() {
  let { isAuth } = useSelector(state => state.profile);
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  let [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    let handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={s.header}>
      <div className={s.logoContainer}>
        <Link className={s.logoText}>РОК БУНКЕР “ДОМ ПАНКА”</Link>
      </div>

      <div className={s.mobileMenuButton} onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </div>

      <nav className={`${s.nav} ${isMenuOpen ? s.navActive : ''}`}>
        {isAuth ? (
          <>
            <Link to={'/products'} className={s.navItem} onClick={() => setIsMenuOpen(false)}>
              <img src={Products} alt="продукты" className={s.icon} />
              <span className={s.mobileLabel}>Товары</span>
            </Link>
            <Link to={'/profile'} className={s.navItem} onClick={() => setIsMenuOpen(false)}>
              <img src={Profile} alt="Профиль" className={s.icon} />
              <span className={s.mobileLabel}>Профиль</span>
            </Link>
            <Link to={'/cart'} className={s.navItem} onClick={() => setIsMenuOpen(false)}>
              <img src={ShoppingCart} alt="Корзина" className={s.icon} />
              <span className={s.mobileLabel}>Корзина</span>
            </Link>
          </>
        ) : (
          <div className={s.authLinks}>
            <Link to="/login" className={s.link} onClick={() => setIsMenuOpen(false)}>Войти</Link>
            <Link to="/register" className={s.link} onClick={() => setIsMenuOpen(false)}>Регистрация</Link>
          </div>
        )}
      </nav>
    </header>
  );
};