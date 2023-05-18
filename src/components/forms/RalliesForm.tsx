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
    changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
    changeError: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}


export default function RalliesForm({ buttonLabel, moreValue, lessValue, moreWinsValue, moreLosesValue, lessWinsValue, lessLosesValue, onChangeMore, onChangeLess, onChangeMoreWins, onChangeMoreLoses, onChangeLessWins, onChangeLessLoses, validationValue, validationsValue, errorValue, changeValidation, changeError, onSubmit }: RalliesFormProps) {

  return (
    <form className={styles.ralliesForm} onSubmit={onSubmit}>
        <p>Distribute the match rallies:</p>
        <TextField placeholder='More than 3 balls' value={moreValue} onChange={onChangeMore} />
        <TextField placeholder='Less than 3 balls' value={lessValue} onChange={onChangeLess} />
        {moreValue != '' && <Outcome label='Distribute wins and loses for rallies more than 3 balls:' winsValue={moreWinsValue} winsOnChange={onChangeMoreWins} losesValue={moreLosesValue} losesOnChange={onChangeMoreLoses} />}
        {lessValue != '' && <Outcome label='Distribute wins and loses for rallies less than 3 balls:' winsValue={lessWinsValue} winsOnChange={onChangeLessWins} losesValue={lessLosesValue} losesOnChange={onChangeLessLoses} />}
        <Button variant='primary' label={buttonLabel} />
        <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
        <Error error={errorValue} setError={changeError} />
    </form>
  )
}