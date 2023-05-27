import styles from "@/styles/components/Placements.module.css";
import TextField from "./TextField";

interface PlacementsProps {
  label: string;
  longFhId: string;
  longMiddleId: string;
  longBhId: string;
  halfLongFhId: string;
  halfLongMiddleId: string;
  halfLongBhId: string;
  shortFhId: string;
  shortMiddleId: string;
  shortBhId: string;
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

export default function Placemnts({ label, longFhId, longMiddleId, longBhId, halfLongFhId, halfLongMiddleId, halfLongBhId, shortFhId, shortMiddleId, shortBhId, longFhValue, longFhOnChange, longMiddleValue, longMiddleOnChange, longBhValue, longBhOnChange, halfLongFhValue, halfLongFhOnChange, halfLongMiddleValue, halfLongMiddleOnChange, halfLongBhValue, halfLongBhOnChange, shortFhValue, shortFhOnChange, shortMiddleValue, shortMiddleOnChange, shortBhValue, shortBhOnChange }: PlacementsProps) {

  return (
    <div className={styles.placements}>
      <p>{label}</p>
      <label htmlFor={longFhId}>Long in forehand</label>
      <TextField id={longFhId} placeholder='Type here' value={longFhValue} onChange={longFhOnChange} />
      <label htmlFor={longMiddleId}>Long in middle</label>
      <TextField id={longMiddleId} placeholder='Type here' value={longMiddleValue} onChange={longMiddleOnChange} />
      <label htmlFor={longBhId}>Long in backhand</label>
      <TextField id={longBhId} placeholder='Type here' value={longBhValue} onChange={longBhOnChange} />
      <label htmlFor={halfLongFhId}>Half long in forehand</label>
      <TextField id={halfLongFhId} placeholder='Type here' value={halfLongFhValue} onChange={halfLongFhOnChange} />
      <label htmlFor={halfLongMiddleId}>Half long in middle</label>
      <TextField id={halfLongMiddleId} placeholder='Type here' value={halfLongMiddleValue} onChange={halfLongMiddleOnChange} />
      <label htmlFor={halfLongBhId}>Half long in backhand</label>
      <TextField id={halfLongBhId} placeholder='Type here' value={halfLongBhValue} onChange={halfLongBhOnChange} />
      <label htmlFor={shortFhId}>Short in forehand</label>
      <TextField id={shortFhId} placeholder='Type here' value={shortFhValue} onChange={shortFhOnChange} />
      <label htmlFor={shortMiddleId}>Short in middle</label>
      <TextField id={shortMiddleId} placeholder='Type here' value={shortMiddleValue} onChange={shortMiddleOnChange} />
      <label htmlFor={shortBhId}>Short in backhand</label>
      <TextField id={shortBhId} placeholder='Type here' value={shortBhValue} onChange={shortBhOnChange} />
    </div>
  )
}