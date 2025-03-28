import { useEffect, useState } from 'react';
import style from './Tabs.module.css';
import PropTypes from 'prop-types';
import { assignId } from '../../../utils/generateRandomId';
import { debounceRaf } from '../../../utils/debounce';
import { Text } from '../../../UI/Text/Text';

import { ReactComponent as ArrowIcon } from './img/arrow.svg';
import { ReactComponent as BestIcon } from './img/best.svg';
import { ReactComponent as HomeIcon } from './img/home.svg';
import { ReactComponent as HotIcon } from './img/hot.svg';
import { ReactComponent as TopIcon } from './img/top.svg';
import { useNavigate } from 'react-router-dom';

const LIST = [
  { value: 'Главная', Icon: HomeIcon, link: 'rising' },
  { value: 'Топ', Icon: TopIcon, link: 'top' },
  { value: 'Лучшие', Icon: BestIcon, link: 'best' },
  { value: 'Горячие', Icon: HotIcon, link: 'hot' },
].map(assignId);

export const Tabs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [textMenu, setTextMenu] = useState('Меню');
  const navigate = useNavigate();

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {dropdownOpen && (
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {textMenu}
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}

      {(isDropdownOpen || !dropdownOpen) && (
        <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
          {LIST.map(({ value, link, id, Icon }) => (
            <li className={style.item} key={id}>
              <Text
                As='button'
                className={style.btn}
                onClick={() => {
                  setTextMenu(value);
                  navigate(`/category/${link}`);
                }}
              >
                {value}
                {Icon && <Icon width={30} height={30} />}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
  addItem: PropTypes.func,
};
