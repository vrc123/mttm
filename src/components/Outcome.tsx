import styles from "@/styles/components/Outcome.module.css";
import TextField from "./TextField";

interface OutcomeProps {
  label: string;
  winsId: string;
  winsValue: string;
  winsOnChange: React.ChangeEventHandler<HTMLInputElement>;
  losesId: string;
  losesValue: string;
  losesOnChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Outcome({ label, winsId, winsValue, winsOnChange, losesId, losesValue, losesOnChange }: OutcomeProps) {

  return (
    <div className={styles.outCome}>
      <p>{label}</p>
      <label htmlFor={winsId}>Wins</label>
      <TextField id={winsId} placeholder='Type here' value={winsValue} onChange={winsOnChange} />
      <label htmlFor={losesId}>Loses</label>
      <TextField id={losesId} placeholder='Type here' value={losesValue} onChange={losesOnChange} />
    </div>
  )
}