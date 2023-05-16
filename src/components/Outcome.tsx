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
      <TextField placeholder='Wins' value={winsValue} onChange={winsOnChange} />
      <TextField placeholder='Loses' value={losesValue} onChange={losesOnChange} />
    </div>
  )
}