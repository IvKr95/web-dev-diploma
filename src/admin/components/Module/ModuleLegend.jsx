/* eslint-disable linebreak-style */

import React from 'react';

const SEAT_TYPES = [
  {
    type: 'standard',
    desc: 'обычные кресла',
  },
  {
    type: 'vip',
    desc: 'VIP кресла',
  },
  {
    type: 'disabled',
    desc: 'заблокированные (нет кресла)',
  },
];

// Показывает доступные типы кресел
function ModuleLegend() {
  return (
    <>
      <p className="conf-step__paragraph">
        Теперь вы можете указать типы кресел на схеме зала:
      </p>

      <div className="conf-step__legend">
        {
          SEAT_TYPES.map((st) => (
            <React.Fragment key={`${st.type}_${st.desc}`}>
              <span className={`conf-step__chair conf-step__chair_${st.type}`} />
              {' '}
              {st.desc}
            </React.Fragment>
          ))
        }
        <p className="conf-step__hint">
          Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
        </p>
      </div>
    </>
  );
}

export default ModuleLegend;
