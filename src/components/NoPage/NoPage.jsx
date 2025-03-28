import style from './NoPage.module.css';

export const NoPage = () => {
  console.log(style);
  return (
    <div className={style.error}>404</div>
  );
};
