import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { character } from '../../interfaces';
import { AppDispatch, storeInterFace } from '../../redux/store';
import styles from './CharacterForm.module.css';
import { useState } from 'react';
import Select from '../../components/Select/Select';
import CharacterDefaultImage from '../../assets/CharacterDefaultImage.svg';
import { addCharacterToLocalStorage } from '../../utils/localStorage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { editCharacter } from '../../redux/reducers/charactersReducer';

const CharacterForm: React.FC<{ type: 'create' | 'edit' }> = ({ type }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<{ id: string }>();
  const { state } = useLocation() as {
    state?: { image: string; name: string; gender: string; origin: string };
  };
  const { genders, origins } = useSelector(
    (state: storeInterFace) => state.characters
  );

  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<{ name: string }>();

  const [currentGender, setGender] = useState<string | undefined>('');
  const [currentOrigin, setOrigin] = useState<string>('');
  const [showImage, setShowImage] = useState<string>(CharacterDefaultImage);
  //   const [image, setImage] = useState<File | undefined>();

  useEffect(() => {
    if (type === 'edit') {
      state?.image && setShowImage(state.image);
      state?.gender && setGender(state.gender);
      state?.origin && setOrigin(state.origin);
      state?.name && setValue('name', state.name);
    }
  }, [type, state, setValue]);

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
    // setImage(selectedFile);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      image: showImage,
      name: watch('name'),
      gender: currentGender,
      origin: { name: currentOrigin }
    };
    if (type === 'create') {
      if (data.image && data.name && data.gender && data.origin.name) {
        addCharacterToLocalStorage({ character: data, navigate, dispatch });
      }
    } else {
      dispatch(editCharacter({ id: Math.floor(Number(id)), ...data }));
      navigate('/home');
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
            itemSelected={currentGender}
            onChangeItem={setGender}
          />
          <Select
            name='Origin'
            elements={origins}
            itemSelected={currentOrigin}
            onChangeItem={setOrigin}
          />
        </div>
        <button
          disabled={
            showImage === CharacterDefaultImage ||
            !watch('name') ||
            !currentGender ||
            !currentOrigin
          }
          type='submit'
          className='w-100 mt-5 btn btn-dark'
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </form>
    </div>
  );
};

export default CharacterForm;
