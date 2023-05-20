import styles from "@/styles/components/Outcome.module.css";
import TextField from "./TextField";

interface OutcomeProps {
  label: string;
  winsValue: string;
  winsOnChange: React.ChangeEventHandler<HTMLInputElement>;
  losesValue: string;
  losesOnChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Outcome({ label, winsValue, winsOnChange, losesValue, losesOnChange }: OutcomeProps) {

  return (
    <div className={styles.outCome}>
      <p>{label}</p>
      <label htmlFor='wins'>Wins</label>
      <TextField id='wins' placeholder='Type here' value={winsValue} onChange={winsOnChange} />
      <label htmlFor='loses'>Loses</label>
      <TextField id='loses' placeholder='Type here' value={losesValue} onChange={losesOnChange} />
    </div>
  )
}