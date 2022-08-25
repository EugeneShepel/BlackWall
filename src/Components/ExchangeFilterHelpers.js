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
    tmpFrom = document.querySelector('.from-active');
    finalFrom = tmpFrom.firstChild.value;
    setActualExchange(e.target.value);
    const elems = document.querySelectorAll('.to-active');
    [].forEach.call(elems, (el) => el.classList.remove('to-active'));
    e.target.closest('label').classList.toggle('to-active');
    setValletCategory((prev) => ({ ...prev, to: e.target.value }));
    dispatch(resetState());
    dispatch(typeFilter({ from: finalFrom, to: e.target.value }));
  }
}

function selectHandler(e) {
  setActualExchange(e.target.value);
  dispatch(resetExchangeFilters());
  dispatch(exchangeVariants(e.target.value));
}
