import style from './BtnDelete.module.css';
import { ReactComponent as DeleteIcon } from './img/delete.svg';


export const BtnDelete = () => (
  <button className={style.delete}><DeleteIcon /></button>
);
