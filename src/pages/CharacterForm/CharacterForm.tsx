import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { character } from '../../interfaces';
import { AppDispatch, storeInterFace } from '../../redux/store';
import styles from './CharacterForm.module.css';
import { useState } from 'react';
import Select from '../../components/Select/Select';
import CharacterDefaultImage from '../../assets/CharacterDefaultImage.svg';
import { addCharacterToLocalStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const CharacterForm: React.FC<{ type: 'create' | 'edit' }> = ({ type }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { genders, origins } = useSelector(
    (state: storeInterFace) => state.characters
  );

  const [gender, setGender] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [showImage, setShowImage] = useState<string>(CharacterDefaultImage);
  const [image, setImage] = useState<File | undefined>();

  console.log({ gender, origin });

  const setFileToBase = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setShowImage(reader.result as string);
      };
    }
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = ev.target.files?.[0];
    setFileToBase(selectedFile);
    setImage(selectedFile);
  };

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<{ name: string }>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: character = {
      image: showImage,
      name: watch('name'),
      gender,
      origin: { name: origin }
    };
    if (type === 'create') {
      addCharacterToLocalStorage({ character: data, navigate, dispatch });
    }
    console.log(data);
  };

  return (
    <div className={styles.characterForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.image}>
          <div className={styles.editImage}>
            <img src={showImage} alt='nombre' />
            <input
              type='file'
              accept='image/*'
              onChange={(ev) => {
                handleFileChange(ev);
              }}
            />
          </div>
          {showImage === CharacterDefaultImage ? (
            <span className={styles.errors}>Image is required</span>
          ) : (
            <br />
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Character name
          </label>
          <input
            type='text'
            className={`form-control ${errors.name && 'border-danger'}`}
            placeholder='Name'
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required'
              },
              minLength: { value: 6, message: 'Min 6 character' }
            })}
          />
          {errors.name ? (
            <span className='form-text text-danger'>{errors.name.message}</span> // Si hay un error en el registro de usuario se muestra el mensaje en un span
          ) : (
            <br />
          )}
        </div>
        <div className='container d-flex'>
          <Select
            name='Gender'
            elements={genders}
            itemSelected={gender}
            onChangeItem={setGender}
          />
          <Select
            name='Origin'
            elements={origins}
            itemSelected={origin}
            onChangeItem={setOrigin}
          />
        </div>
        <button
          disabled={
            showImage === CharacterDefaultImage ||
            !watch('name') ||
            !gender ||
            !origin
          }
          type='submit'
          className='w-100 mt-5 btn btn-dark'
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CharacterForm;
