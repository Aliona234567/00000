import s from "./Footer.module.css"

export function Footer () {
  return (
    <footer className={s.footer}>
      <a href="mailto:DomPanka1@gmail.com" className={s.link}>DomPanka1@gmail.com</a>
      <a href="tel:+7(916)985-67-45" className={s.link}>+7(916)985-67-45</a>
    </footer>
  )
};

