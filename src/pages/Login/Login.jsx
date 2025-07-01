import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, clearLoginError } from '../Profile/profileSlice';
import s from "./Login.module.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, loginError } = useSelector(state => state.profile);

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        if (email || password) {
            dispatch(clearLoginError());
            setFormError("");
        }
    }, [email, password, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setFormError("Заполните все поля");
            return;
        }
        
        dispatch(login({ email, password }));
    };

    return (
        <div className={s.container}>
            <div className={s.formContainer}>
                <h2 className={s.title}>Вход</h2>

                {formError && <p className={s.error}>{formError}</p>}
                {loginError && <p className={s.error}>{loginError}</p>}

                <form onSubmit={handleSubmit} className={s.form}>
                    <div className={s.inputGroup}>
                        <label htmlFor="email" className={s.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={s.input}
                            placeholder="rock@example.com"
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <label htmlFor="password" className={s.label}>Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={s.input}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className={s.submitButton}>Войти</button>
                </form>

                <div className={s.links}>
                    <p>Нет аккаунта? <Link to="/register" className={s.link}>Зарегистрироваться</Link></p>
                    <Link to="/" className={s.link}>Вернуться на главную</Link>
                </div>
            </div>
        </div>
    );
}