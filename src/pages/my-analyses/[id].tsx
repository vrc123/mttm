import styles from '@/styles/pages/Analysis.module.css'
import { supabase } from '../../../supabase-client'

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data } = await supabase
    .from("analyses")
    .select(`
        date,
        score,
        opponents ( id, firstName, middleName, lastName, country, birthday ),
        serves ( 
            id,
            forehandServes ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh ),
            backhandServes ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh )
        ),
        recieves ( 
            id,
            forehandRecieves ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh ),
            backhandRecieves ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh )
        ),
        rallies ( id, moreWins, moreLoses, lessWins, lessLoses )
    `)
    .eq('id', id)
    .single()
    return {
        props: {
            data,
        },
    }
}

interface Analysis {
    id: number;
    date: string;
    score: string;
    opponents: {
        id: number,
        firstName: string,
        middleName: string,
        lastName: string,
        country: string,
        birthday: string
    },
    serves: {
        id: number
        forehandServes: {
            id: number;
            longFh: string;
            longMiddle: string;
            longBh: string;
            halfLongFh: string;
            halfLongMiddle: string;
            halfLongBh: string;
            shortFh: string;
            shortMiddle: string;
            shortBh: string;
        },
        backhandServes: {
            id: number;
            longFh: string;
            longMiddle: string;
            longBh: string;
            halfLongFh: string;
            halfLongMiddle: string;
            halfLongBh: string;
            shortFh: string;
            shortMiddle: string;
            shortBh: string;
        }
    },
    recieves: {
        id: number
        forehandRecieves: {
            id: number;
            longFh: string;
            longMiddle: string;
            longBh: string;
            halfLongFh: string;
            halfLongMiddle: string;
            halfLongBh: string;
            shortFh: string;
            shortMiddle: string;
            shortBh: string;
        },
        backhandRecieves: {
            id: number;
            longFh: string;
            longMiddle: string;
            longBh: string;
            halfLongFh: string;
            halfLongMiddle: string;
            halfLongBh: string;
            shortFh: string;
            shortMiddle: string;
            shortBh: string;
        }
    },
    rallies: {
        id: number,
        moreWins: string,
        moreLoses: string,
        lessWins: string,
        lessLoses: string
    }
}

interface AnalysisProps {
    data: Analysis;
}

export default function Analysis({ data }: AnalysisProps) {

    return (
        <div className={styles.analysis} >
        <h1>Match analysis</h1>
            <div>
                <h2>Date</h2>
                <p>Date of the match: {data.date}</p>
            </div>
            <div>
                <h2>Score</h2>
                <p>Match score: {data.score}</p>
            </div>
            <div>
                <h2>Opponent</h2>
                <p>Name: {data.opponents.firstName} {data.opponents.middleName} {data.opponents.lastName}</p>
                <p>Country: {data.opponents.country}</p>
                <p>Birthday: {data.opponents.birthday}</p>
            </div>
            <div>
                <h2>Serves</h2>
                <h3>Forehand serves</h3>
                <p>Long in forehand: {Number(data.serves.forehandServes.longFh)}</p>
                <p>Long in middle: {Number(data.serves.forehandServes.longMiddle)}</p>
                <p>Long in backhand: {Number(data.serves.forehandServes.longBh)}</p>
                <p>Half long in forehand: {Number(data.serves.forehandServes.halfLongFh)}</p>
                <p>Half long in middle: {Number(data.serves.forehandServes.halfLongMiddle)}</p>
                <p>Half long in backhand: {Number(data.serves.forehandServes.halfLongBh)}</p>
                <p>Short in forehand: {Number(data.serves.forehandServes.shortFh)}</p>
                <p>Short in middle: {Number(data.serves.forehandServes.shortMiddle)}</p>
                <p>Short in backhand: {Number(data.serves.forehandServes.shortBh)}</p>
                <h3>Backhand serves</h3>
                <p>Long in forehand: {Number(data.serves.backhandServes.longFh)}</p>
                <p>Long in middle: {Number(data.serves.backhandServes.longMiddle)}</p>
                <p>Long in backhand: {Number(data.serves.backhandServes.longBh)}</p>
                <p>Half long in forehand: {Number(data.serves.backhandServes.halfLongFh)}</p>
                <p>Half long in middle: {Number(data.serves.backhandServes.halfLongMiddle)}</p>
                <p>Half long in backhand: {Number(data.serves.backhandServes.halfLongBh)}</p>
                <p>Short in forehand: {Number(data.serves.backhandServes.shortFh)}</p>
                <p>Short in middle: {Number(data.serves.backhandServes.shortMiddle)}</p>
                <p>Short in backhand: {Number(data.serves.backhandServes.shortBh)}</p>
            </div>
            <div>
                <h2>Recieves</h2>
                <h3>Forehand recieves</h3>
                <p>Long in forehand: {Number(data.recieves.forehandRecieves.longFh)}</p>
                <p>Long in middle: {Number(data.recieves.forehandRecieves.longMiddle)}</p>
                <p>Long in backhand: {Number(data.recieves.forehandRecieves.longBh)}</p>
                <p>Half long in forehand: {Number(data.recieves.forehandRecieves.halfLongFh)}</p>
                <p>Half long in middle: {Number(data.recieves.forehandRecieves.halfLongMiddle)}</p>
                <p>Half long in backhand: {Number(data.recieves.forehandRecieves.halfLongBh)}</p>
                <p>Short in forehand: {Number(data.recieves.forehandRecieves.shortFh)}</p>
                <p>Short in middle: {Number(data.recieves.forehandRecieves.shortMiddle)}</p>
                <p>Short in backhand: {Number(data.recieves.forehandRecieves.shortBh)}</p>
                <h3>Backhand recieves</h3>
                <p>Long in forehand: {Number(data.recieves.backhandRecieves.longFh)}</p>
                <p>Long in middle: {Number(data.recieves.backhandRecieves.longMiddle)}</p>
                <p>Long in backhand: {Number(data.recieves.backhandRecieves.longBh)}</p>
                <p>Half long in forehand: {Number(data.recieves.backhandRecieves.halfLongFh)}</p>
                <p>Half long in middle: {Number(data.recieves.backhandRecieves.halfLongMiddle)}</p>
                <p>Half long in backhand: {Number(data.recieves.backhandRecieves.halfLongBh)}</p>
                <p>Short in forehand: {Number(data.recieves.backhandRecieves.shortFh)}</p>
                <p>Short in middle: {Number(data.recieves.backhandRecieves.shortMiddle)}</p>
                <p>Short in backhand: {Number(data.recieves.backhandRecieves.shortBh)}</p>
            </div>
            <div>
                <h2>Rallies</h2>
                <p>More than 3 balls wins: {Number(data.rallies.moreWins)}</p>
                <p>More than 3 balls loses: {Number(data.rallies.moreLoses)}</p>
                <p>Less than 3 balls wins: {Number(data.rallies.lessWins)}</p>
                <p>Less than 3 balls loses: {Number(data.rallies.lessLoses)}</p>
            </div>
        </div>
    )
}