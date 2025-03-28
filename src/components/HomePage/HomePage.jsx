import style from './HomePage.module.css';

export const HomePage = () => {
  console.log(style);
  return (
    <div className={style.home}>
      <h1>Стартовая страница</h1>
      <p>Добро пожаловать!</p>
      <p>Выберите категорию</p>
    </div>
  );
};
