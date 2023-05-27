import styles from '@/styles/components/forms/RalliesForm.module.css'
import TextField from '../TextField'
import Outcome from '../Outcome'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

interface RalliesFormProps {
    buttonLabel: string;
    moreValue: string;
    onChangeMore: React.ChangeEventHandler<HTMLInputElement>;
    lessValue: string;
    onChangeLess: React.ChangeEventHandler<HTMLInputElement>;
    moreWinsValue: string;
    onChangeMoreWins: React.ChangeEventHandler<HTMLInputElement>;
    moreLosesValue: string;
    onChangeMoreLoses: React.ChangeEventHandler<HTMLInputElement>;
    lessWinsValue: string;
    onChangeLessWins: React.ChangeEventHandler<HTMLInputElement>;
    lessLosesValue: string;
    onChangeLessLoses: React.ChangeEventHandler<HTMLInputElement>;
    validationValue: boolean;
    validationsValue: string[];
    errorValue: boolean;
    isLoadingValue: boolean;
    changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
    changeError: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}


export default function RalliesForm({ buttonLabel, moreValue, lessValue, moreWinsValue, moreLosesValue, lessWinsValue, lessLosesValue, onChangeMore, onChangeLess, onChangeMoreWins, onChangeMoreLoses, onChangeLessWins, onChangeLessLoses, validationValue, validationsValue, errorValue, isLoadingValue, changeValidation, changeError, onSubmit }: RalliesFormProps) {

  return (
    <form className={styles.ralliesForm} onSubmit={onSubmit}>
      <label htmlFor='more'>More than 3 balls</label>
      <TextField id='more' placeholder='Type here' value={moreValue} onChange={onChangeMore} />
      <label htmlFor='less'>Less than 3 balls</label>
      <TextField id='less' placeholder='Type here' value={lessValue} onChange={onChangeLess} />
      {(moreValue != '' || moreWinsValue != '' || moreLosesValue != '') && <Outcome label='Distribute wins and loses for rallies more than 3 balls:' winsId='moreWins' winsValue={moreWinsValue} winsOnChange={onChangeMoreWins} losesId='moreLoses' losesValue={moreLosesValue} losesOnChange={onChangeMoreLoses} />}
      {(lessValue != '' || lessWinsValue != '' || lessLosesValue != '') && <Outcome label='Distribute wins and loses for rallies less than 3 balls:' winsId='lessWins' winsValue={lessWinsValue} winsOnChange={onChangeLessWins} losesId='lessLoses' losesValue={lessLosesValue} losesOnChange={onChangeLessLoses} />}
      {!isLoadingValue && <Button variant='primary' label={buttonLabel} />}
      {isLoadingValue && <p className={styles.loading}>Loading...</p>}
      <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
      <Error error={errorValue} setError={changeError} />
    </form>
  )
}