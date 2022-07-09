import React, { useState } from 'react';
import { v4 } from 'uuid';
import StepsForm from './StepsForm.jsx';

function Steps() {
  const [form, setForm] = useState({
    date: '',
    distance: '',
  });

  const [data, setData] = useState([
    { date: '22.09.2021', distance: '7.7', id: v4() },
  ]);

  return (
    <div className='container'>
      <StepsForm data={data} setData={setData} form={form} setForm={setForm} />
    </div>
  );
}

export default Steps;
