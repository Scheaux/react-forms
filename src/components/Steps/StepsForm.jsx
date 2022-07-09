import React from 'react';
import './styles.css';
import { v4 } from 'uuid';

function StepsForm(props) {
  const { data, setData, form, setForm } = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    const existingData = data.find((x) => x.date === form.date);
    if (existingData) {
      setData((prev) => {
        const filtered = prev.filter((x) => x.id !== existingData.id);
        return [
          ...filtered,
          {
            ...existingData,
            distance: `${+existingData.distance + +form.distance}`,
          },
        ].sort((a, b) => {
          const aDate = a.date.split('.');
          const bDate = b.date.split('.');
          const ad = new Date(aDate[2], aDate[1], aDate[0]);
          const bd = new Date(bDate[2], bDate[1], bDate[0]);
          return bd - ad;
        });
      });
    } else {
      setData((prev) =>
        [...prev, { ...form, id: v4() }].sort((a, b) => {
          const aDate = a.date.split('.');
          const bDate = b.date.split('.');
          const ad = new Date(aDate[2], aDate[1], aDate[0]);
          const bd = new Date(bDate[2], bDate[1], bDate[0]);
          return bd - ad;
        })
      );
    }

    setForm({ date: '', distance: '' });
  }

  function dateChange(evt) {
    setForm({ ...form, date: evt.target.value });
  }

  function distanceChange(evt) {
    setForm({ ...form, distance: evt.target.value });
  }

  function handleRemove(id) {
    setData(data.filter((x) => x.id !== id));
  }

  return (
    <>
      <form action='submit' onSubmit={handleSubmit}>
        <div className='form-inputs'>
          <div className='block'>
            <label htmlFor='date'>Дата (ДД.ММ.ГГ)</label>
            <input
              id='date'
              className='form-input'
              name='date'
              onChange={dateChange}
              value={form.date}
            />
          </div>
          <div className='block'>
            <label htmlFor='distance'>Пройдено км</label>
            <input
              className='form-input'
              name='distance'
              onChange={distanceChange}
              value={form.distance}
            />
          </div>
          <button id='form-ok-btn' type='submit'>
            OK
          </button>
        </div>
      </form>

      <div className='output-container'>
        <div className='output-head'>
          <span>Дата (ДД.ММ.ГГ)</span>
          <span>Пройдено км</span>
          <span>Действия</span>
        </div>
        <div className='output-body'>
          {data.map((x) => (
            <div className='output' key={x.id}>
              <span>{x.date}</span>
              <span>{x.distance}</span>
              <div>
                <span className='pointer' onClick={() => handleRemove(x.id)}>
                  ✘
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StepsForm;
