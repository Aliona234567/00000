import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from '../Profile/profileSlice'
import s from '../Login/Login.module.css'

export function Register() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [error, setError] = useState("");
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Заполните все поля");
            return;
        }

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        if (password.length < 6) {
            setError("Пароль должен быть не менее 6 символов");
            return;
        }

        dispatch(register({ name, email, password }));
        navigate("/");
    };

    return (
        <div className={s.container}>
            <div className={s.formContainer}>
                <h2 className={s.title}>Регистрация</h2>

                {error && <p className={s.error}>{error}</p>}

                <form onSubmit={handleSubmit} className={s.form}>
                    <div className={s.inputGroup}>
                        <label htmlFor="name" className={s.label}>Имя</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={s.input}
                            placeholder="Иван Иванов"
                        />
                    </div>

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

                    <div className={s.inputGroup}>
                        <label htmlFor="confirmPassword" className={s.label}>Подтвердите пароль</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={s.input}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className={s.submitButton}>Зарегистрироваться</button>
                </form>

                <div className={s.links}>
                    <p>Уже есть аккаунт? <Link to="/login" className={s.link}>Войти</Link></p>
                    <Link to="/" className={s.link}>Вернуться на главную</Link>
                </div>
            </div>
        </div>
    );
}