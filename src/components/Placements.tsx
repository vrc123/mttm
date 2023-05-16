import styles from "@/styles/components/Placements.module.css";
import TextField from "./TextField";

interface PlacementsProps {
  label: string;
  longFhValue: string;
  longFhOnChange: React.ChangeEventHandler<HTMLInputElement>;
  longMiddleValue: string;
  longMiddleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  longBhValue: string;
  longBhOnChange: React.ChangeEventHandler<HTMLInputElement>;
  halfLongFhValue: string;
  halfLongFhOnChange: React.ChangeEventHandler<HTMLInputElement>;
  halfLongMiddleValue: string;
  halfLongMiddleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  halfLongBhValue: string;
  halfLongBhOnChange: React.ChangeEventHandler<HTMLInputElement>;
  shortFhValue: string;
  shortFhOnChange: React.ChangeEventHandler<HTMLInputElement>;
  shortMiddleValue: string;
  shortMiddleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  shortBhValue: string;
  shortBhOnChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Placemnts({ label, longFhValue, longFhOnChange, longMiddleValue, longMiddleOnChange, longBhValue, longBhOnChange, halfLongFhValue, halfLongFhOnChange, halfLongMiddleValue, halfLongMiddleOnChange, halfLongBhValue, halfLongBhOnChange, shortFhValue, shortFhOnChange, shortMiddleValue, shortMiddleOnChange, shortBhValue, shortBhOnChange }: PlacementsProps) {

  return (
    <div className={styles.placements}>
      <p>{label}</p>
      <TextField placeholder='Long in forehand' value={longFhValue} onChange={longFhOnChange} />
      <TextField placeholder='Long in middle' value={longMiddleValue} onChange={longMiddleOnChange} />
      <TextField placeholder='Long in backhand' value={longBhValue} onChange={longBhOnChange} />
      <TextField placeholder='Half long in forehand' value={halfLongFhValue} onChange={halfLongFhOnChange} />
      <TextField placeholder='Half long in middle' value={halfLongMiddleValue} onChange={halfLongMiddleOnChange} />
      <TextField placeholder='Half long in backhand' value={halfLongBhValue} onChange={halfLongBhOnChange} />
      <TextField placeholder='Short in forehand' value={shortFhValue} onChange={shortFhOnChange} />
      <TextField placeholder='Short in middle' value={shortMiddleValue} onChange={shortMiddleOnChange} />
      <TextField placeholder='Short in backhand' value={shortBhValue} onChange={shortBhOnChange} />
    </div>
  )
}