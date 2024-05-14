import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './UserSettingsForm.module.css';
import { FormValidateError } from '../FormValidateError/FormValidateError';
import { calcRequiredWater } from '../../helpers/calcRequiredWater';

const schema = yup.object().shape({
  avatar: yup.mixed(),

  gender: yup
    .string()
    .nullable()
    .oneOf(['Woman', 'Man', 'Please select your gender']),

  name: yup.string(),

  email: yup.string().email('Please enter a valid email address'),

  weight: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),

  time: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),

  amount: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),
});

export const UserSettingsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    // створюємо та заповнюємо формДату

    const formData = new FormData();

    for (const key in data) {
      if (key === 'avatar') {
        if (data[key][0] !== undefined) {
          formData.append(key, data[key][0]);
        }
        continue;
      }

      if (data[key] === '' || data[key] === undefined || data[key] === null) {
        continue;
      }
      formData.append(key, data[key]);
    }
    // Тимчасовий вивід в консоль  форм-дати

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    // далі відправляю форм дату
  };

  const { avatar, gender, name, email, weight, time, amount } = watch();

  //перевірка, чи заповнене хоча б одно з полів форми
  // якщо всі поля порожні -кнопка сабміту деактивована
  const isAnyFieldFilled =
    avatar || gender || name || email || weight || time || amount;

  const requiredWater = calcRequiredWater(gender, weight, time);

  return (
    <form className={css.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.avatarWrapper}>
        {/*      
          <img
            className={css.avatar}
            src={URL.createObjectURL(watch('avatar')[0])}
            alt="Avatar"
          /> */}

        <div className={css.avatar}></div>

        {!watch('avatar') || watch('avatar').length === 0 ? (
          <>
            <input
              {...register('avatar')}
              className={css.hiddenFileInput}
              type="file"
              name="avatar"
              id="avatar"
              placeholder={'Upload a photo'}
            />
            <label htmlFor="avatar" className={css.fileLabel}>
              Upload a photo
            </label>
          </>
        ) : (
          <strong>{watch('avatar')[0].name}</strong>
        )}
        {errors.avatar && <FormValidateError message={errors.avatar.message} />}
      </div>

      <div className={css.settingsWrapper}>
        <div className={css.leftDesktopWrapper}>
          <div className={css.genderWrapper}>
            <p className={css.subtitle}>Your gender identity</p>
            <input
              {...register('gender')}
              className={css.hiddenRadioInput}
              type="radio"
              name="gender"
              id="woman"
              value="Woman"
            />
            <label className={`${css.text} ${css.genderLabel}`} htmlFor="woman">
              Woman
            </label>

            <input
              {...register('gender')}
              className={css.hiddenRadioInput}
              type="radio"
              name="gender"
              id="man"
              value="Man"
            />
            <label className={`${css.text} ${css.genderLabel}`} htmlFor="man">
              Man
            </label>

            {errors.gender && (
              <FormValidateError message={errors.gender.message} />
            )}
          </div>

          <div className={css.infoWrapper}>
            <label className={css.subtitle} htmlFor="name">
              Your name
            </label>
            <input
              {...register('name')}
              className={css.input}
              type="text"
              name="name"
              id="name"
            />
            {errors.name && <FormValidateError message={errors.name.message} />}

            <label className={css.subtitle} htmlFor="email">
              Email
            </label>
            <input
              {...register('email')}
              className={css.input}
              type="text"
              name="email"
              id="email"
            />
            {errors.email && (
              <FormValidateError message={errors.email.message} />
            )}
          </div>

          <div className={css.normaWrapper}>
            <p className={css.subtitle}>My daily norma</p>

            <div className={css.formulaWrapper}>
              <div className={css.formulaSubwrapper}>
                <p className={css.text}>For woman:</p>
                <span className={`${css.text} ${css.normaFormula}`}>
                  V=(M*0,03) + (T*0,4)
                </span>
              </div>

              <div className={css.formulaSubwrapper}>
                <p className={css.text}>For man:</p>
                <span className={`${css.text} ${css.normaFormula}`}>
                  V=(M*0,04) + (T*0,6)
                </span>
              </div>
            </div>

            <p className={css.normaTextArea}>
              <span className={css.normaAsterisk}>*</span> V is the volume of
              the water norm in liters per day, M is your body weight, T is the
              time of active sports, or another type of activity commensurate in
              terms of loads (in the absence of these, you must set 0)
            </p>

            <span className={`${css.text} ${css.footnote}`}>
              Active time in hours
            </span>
          </div>
        </div>

        <div className={css.rightDesktopWrapper}>
          <div className={css.metricsWrapper}>
            <label className={css.text} htmlFor="weight">
              Your weight in kilograms:
            </label>
            <input
              {...register('weight')}
              className={css.input}
              type="number"
              name="weight"
              id="weight"
            />
            {errors.weight && (
              <FormValidateError message={errors.weight.message} />
            )}

            <label className={css.text} htmlFor="time">
              The time of active participation in sports:
            </label>
            <input
              {...register('time')}
              className={css.input}
              type="number"
              name="time"
              id="time"
            />
            {errors.time && <FormValidateError message={errors.time.message} />}
          </div>

          <div className={css.waterAmountWrapper}>
            <div className={css.amountField}>
              <p className={css.text}>
                The required amount of water in liters per day:
              </p>

              <span className={css.amount}>
                {!watch('gender') || !watch('weight')
                  ? 'Waiting for your metrics'
                  : requiredWater + ' L'}
              </span>
            </div>

            <label className={css.subtitle} htmlFor="amount">
              Write down how much water you will drink:
            </label>
            <input
              {...register('amount')}
              className={css.input}
              type="number"
              name="amount"
              id="amount"
            />
            {errors.amount && (
              <FormValidateError message={errors.amount.message} />
            )}
          </div>
        </div>
      </div>

      <button
        className={css.submitButton}
        type="submit"
        disabled={!isAnyFieldFilled}
      >
        Save
      </button>
    </form>
  );
};
