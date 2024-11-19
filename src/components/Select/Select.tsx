import React from 'react';

interface selectParams {
  name: string;
  elements: string[] | undefined;
  itemSelected: string;
  onChangeItem: (gender: string) => void;
}

const Select: React.FC<selectParams> = ({
  name,
  elements,
  itemSelected,
  onChangeItem
}) => {
  return (
    <div className='container w-25'>
      <label htmlFor='genderSelect' className='form-label'>
        {name}
      </label>
      <select
        id='genderSelect'
        className='form-select'
        value={itemSelected}
        onChange={(e) => onChangeItem(e.target.value)}
      >
        <option value=''>Select</option>
        {elements?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
