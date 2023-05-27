import styles from '@/styles/components/forms/OpponentForm.module.css'
import TextField from '../TextField'
import CalenderPicker from '../CalenderPicker'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

interface OpponentFormProps {
  buttonLabel: string;
  firstNameValue: string;
  middleNameValue: string;
  lastNameValue: string;
  countryValue: string;
  birthdayValue: string;
  validationValue: boolean;
  validationsValue: string[];
  errorValue: boolean;
  isLoadingValue: boolean;
  onChangeFirstName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeMiddleName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeLastName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeCountry: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBirthday: React.ChangeEventHandler<HTMLInputElement>;
  changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
  changeError: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function OpponentForm({ buttonLabel, firstNameValue, middleNameValue, lastNameValue, countryValue, birthdayValue, validationValue, validationsValue, errorValue, isLoadingValue, onChangeFirstName, onChangeMiddleName, onChangeLastName, onChangeCountry, onChangeBirthday, changeValidation, changeError, onSubmit }: OpponentFormProps) {

  return (
    <form className={styles.opponentForm} onSubmit={onSubmit}>
      <label htmlFor='firstName'>First name*</label>
      <TextField id='firstName' placeholder='Type here' value={firstNameValue} onChange={onChangeFirstName} />
      <label htmlFor='middleName'>Middle name</label>
      <TextField id='middleName' placeholder='Type here' value={middleNameValue} onChange={onChangeMiddleName} />
      <label htmlFor='lastName'>Last name*</label>
      <TextField id='lastName' placeholder='Type here' value={lastNameValue} onChange={onChangeLastName} />
      <label htmlFor='opponentCountry'>Country*</label>
      <TextField id='opponentCountry' placeholder='Type here' value={countryValue} onChange={onChangeCountry} />
      <label htmlFor='birthday'>Birthday*</label>
      <CalenderPicker id='birthday' value={birthdayValue} onChange={onChangeBirthday} />
      {!isLoadingValue && <Button variant='primary' label={buttonLabel} />}
      {isLoadingValue && <p className={styles.loading}>Loading...</p>}
      <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
      <Error error={errorValue} setError={changeError} />
    </form>
  )
}