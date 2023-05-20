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
      <label htmlFor='longFh'>Long in forehand</label>
      <TextField id='longFh' placeholder='Type here' value={longFhValue} onChange={longFhOnChange} />
      <label htmlFor='longMiddle'>Long in middle</label>
      <TextField id='longMiddle' placeholder='Type here' value={longMiddleValue} onChange={longMiddleOnChange} />
      <label htmlFor='longBh'>Long in backhand</label>
      <TextField id='longBh' placeholder='Type here' value={longBhValue} onChange={longBhOnChange} />
      <label htmlFor='halfLongFh'>Half long in forehand</label>
      <TextField id='halfLongFh' placeholder='Type here' value={halfLongFhValue} onChange={halfLongFhOnChange} />
      <label htmlFor='halfLongMiddle'>Half long in middle</label>
      <TextField id='halfLongMiddle' placeholder='Type here' value={halfLongMiddleValue} onChange={halfLongMiddleOnChange} />
      <label htmlFor='halfLongBh'>Half long in backhand</label>
      <TextField id='halfLongBh' placeholder='Type here' value={halfLongBhValue} onChange={halfLongBhOnChange} />
      <label htmlFor='shortFh'>Short in forehand</label>
      <TextField id='shortFh' placeholder='Type here' value={shortFhValue} onChange={shortFhOnChange} />
      <label htmlFor='shortMiddle'>Short in middle</label>
      <TextField id='shortMiddle' placeholder='Type here' value={shortMiddleValue} onChange={shortMiddleOnChange} />
      <label htmlFor='shortBh'>Short in backhand</label>
      <TextField id='shortBh' placeholder='Type here' value={shortBhValue} onChange={shortBhOnChange} />
    </div>
  )
}