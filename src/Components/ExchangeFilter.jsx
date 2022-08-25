/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ExchangeFilter.scss';
import { v4 as uuid } from 'uuid';
import { typeFilter, resetState } from '../Redux/directions/valletTypesSlice';
import { exchangeVariants, resetExchangeFilters } from '../Redux/directions/filtersSlice';

function ExchangeFilter() {
  const initialCategory = { from: 'Все', to: 'Все' };
  const [valletCategory, setValletCategory] = useState(initialCategory);
  const [actualExchange, setActualExchange] = useState();
  const [filteredByType, setFilteredByType] = useState([]);

  const valletTypes = useSelector((state) => state.valletTypes);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  function changeHandler(e) {
    const data = e.target.value;
    let tmpFrom;
    let finalFrom;
    if (e.target.name === 'from') {
      const filterFrom = document.querySelectorAll('.from-active');
      const filterTo = document.querySelectorAll('.to-active');
      [].forEach.call(filterFrom, (el) => el.classList.remove('from-active'));
      [].forEach.call(filterTo, (el) => el.classList.remove('to-active'));
      e.target.closest('label').classList.toggle('from-active');
      setValletCategory((prev) => ({ ...prev, [e.target.name]: data, to: 'Все' }));
      dispatch(resetState());
      dispatch(typeFilter({ from: e.target.value, to: 'Все' }));
      const anchorTo = document.querySelector('.to');
      anchorTo.nextSibling.classList.toggle('to-active');
      tmpFrom = document.querySelector('.from-active');
      finalFrom = tmpFrom.firstChild.value;
    } else if (e.target.name === 'to') {
      tmpFrom = document.querySelector('.to-active');
      finalFrom = tmpFrom.firstChild.value;

      const elems = document.querySelectorAll('.to-active');
      [].forEach.call(elems, (el) => el.classList.remove('to-active'));
      e.target.closest('label').classList.toggle('to-active');
      setValletCategory((prev) => ({ ...prev, to: e.target.value }));

      const tmpCurrentVallet = document.querySelector('.exchangeVallet');
      const currentVallet = tmpCurrentVallet.value;
      const tmpCurrentFilter = document.querySelector('.to-active');
      const currentFilter = tmpCurrentFilter.firstChild.value;

      console.log('filters', filters, 'valletTypes', valletTypes, 'поиск в', currentVallet, 'фильтр по', currentFilter);

      dispatch(resetState());
      const output = filters.find((el) => el.from.code === currentVallet);
      const findKey = valletTypes.data.find((el) => el[currentFilter]);
      const filteredOutput = output.to.filter((el) => findKey[currentFilter].includes(el.code));

      setFilteredByType(filteredOutput);

      // console.log('output', output, 'key', findKey, 'result', a);

      // dispatch(typeFilter({ from: finalFrom, to: e.target.value }));
    }
  }

  function selectHandler(e) {
    const filterTo = document.querySelectorAll('.to-active');
    [].forEach.call(filterTo, (el) => el.classList.remove('to-active'));
    const anchorTo = document.querySelector('.to');
    anchorTo.nextSibling.classList.toggle('to-active');
    setActualExchange(e.target.value);
    dispatch(resetExchangeFilters());
    dispatch(exchangeVariants(e.target.value));
  }

  return (
    <form className="exchange-form">
      <p className="exchange-title from">Отдаете</p>
      <label className="answer-label from-active">
        <input className="answer-checkbox" type="radio" name="from" value="Все" onChange={(e) => changeHandler(e)} />
        Все
      </label>
      <label className="answer-label">
        <input className="answer-checkbox" type="radio" name="from" value="Банки RUB" onChange={(e) => changeHandler(e)} />
        Банки RUB
      </label>
      <label className="answer-label">
        <input className="answer-checkbox" type="radio" name="from" value="Криптовалюты" onChange={(e) => changeHandler(e)} />
        Криптовалюты
      </label>
      <label className="answer-label">
        <input className="answer-checkbox" type="radio" name="from" value="Наличные" onChange={(e) => changeHandler(e)} />
        Наличные
      </label>

      <div className="exchange-filter">
        <textarea disabled className="exchange-value" name="" rows="1" value="12345" />

        <select className="exchangeVallet" value={actualExchange} onChange={(e) => selectHandler(e)}>

          {valletTypes && valletTypes.data[0][valletCategory.from].map((el) => (
            <option
              key={uuid()}
              value={el}
            >
              {el}
            </option>
          ))}

        </select>
      </div>

      <p className="exchange-title to">Получаете</p>
      <label className="answer-label to-active">
        <input className="answer-checkbox" type="radio" name="to" value="Все" onChange={(e) => changeHandler(e)} />
        Все
      </label>
      <label className="answer-label">
        <input className="answer-checkbox" type="radio" name="to" value="Банки RUB" onChange={(e) => changeHandler(e)} />
        Банки RUB
      </label>
      <label className="answer-label">
        <input className="answer-checkbox" type="radio" name="to" value="Криптовалюты" onChange={(e) => changeHandler(e)} />
        Криптовалюты
      </label>
      <label className="answer-label">
        <input className="answer-checkbox" type="radio" name="to" value="Наличные" onChange={(e) => changeHandler(e)} />
        Наличные
      </label>

      <div className="exchange-filter">
        <textarea disabled className="exchange-value" name="" rows="1" value="12345" />
        <select className="exchangeVallet">

          {/* { filters.length > 1
            ? filters
            && filters.filter((el) => (el.from.code === valletTypes.data[0][valletCategory.from][0]))[0].to.map((el) => (<option key={uuid()} value="">{el.code}</option>))
            : filteredByType && filteredByType.map((el) => (
              <option key={uuid()} value={el.code}>{el.code}</option>
            ))} */}

          {filteredByType.map((el) => (
            <option key={uuid()} value={el.code}>{el.code}</option>
          ))}

        </select>
        {/* filters && filters[0].to.map((el) => (
             <option key={uuid()} value={el.code}>{el.code}</option>
        )) */}
      </div>
    </form>
  );
}

export default ExchangeFilter;
