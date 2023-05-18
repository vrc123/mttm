import styles from '@/styles/pages/Analysis.module.css'
import { supabase } from '../../../supabase-client'
import { useRouter } from 'next/router';
import Button from '@/components/Button';

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data } = await supabase
    .from("analyses")
    .select(`
        id,
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
        rallies ( 
            id,
            ralliesMore ( id, wins, loses ),
            ralliesLess ( id, wins, loses )
        )
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
        id: number;
        ralliesMore: {
            id: number;
            wins: string;
            loses: string;
        }
        ralliesLess: {
            id: number;
            wins: string;
            loses: string;
        }
    }
}

interface AnalysisProps {
    data: Analysis;
}

export default function Analysis({ data }: AnalysisProps) {

    const router = useRouter()

    function editDate() {
        router.push('/my-analyses/edit/date/' + data.id)
    }

    function editOpponent() {
        router.push('/my-analyses/edit/opponent/' + data.id)
    }

    function editScore() {
        router.push('/my-analyses/edit/score/' + data.id)
    }

    function editFhServes() {
        router.push('/my-analyses/edit/forehand-serves/' + data.id)
    }

    function editBhServes() {
        router.push('/my-analyses/edit/backhand-serves/' + data.id)
    }

    function editFhRecieves() {
        router.push('/my-analyses/edit/forehand-recieves/' + data.id)
    }

    function editBhRecieves() {
        router.push('/my-analyses/edit/backhand-recieves/' + data.id)
    }

    function editRallies() {
        router.push('/my-analyses/edit/rallies/' + data.id)
    }

    return (
        <div className={styles.analysis} >
            <h1>Match analysis</h1>
            <div>
                <h2>Date</h2>
                <p>Date of the match: {data.date}</p>
                <div>
                    <Button variant='secondary' label='Edit' onClick={editDate} />
                </div>
            </div>
            <div>
                <h2>Score</h2>
                <p>Match score: {data.score}</p>
                <div>
                    <Button variant='secondary' label='Edit' onClick={editScore} />
                </div>
            </div>
            <div>
                <h2>Opponent</h2>
                <p>Name: {data.opponents.firstName} {data.opponents.middleName} {data.opponents.lastName}</p>
                <p>Country: {data.opponents.country}</p>
                <p>Birthday: {data.opponents.birthday}</p>
                <div>
                    <Button variant='secondary' label='Edit' onClick={editOpponent} />
                </div>
            </div>
            <div>
                <h2>Serves</h2>
                <p>Long in forehand: {Number(data.serves.forehandServes.longFh) + Number(data.serves.backhandServes.longFh)}</p>
                <p>Long in middle: {Number(data.serves.forehandServes.longMiddle) + Number(data.serves.backhandServes.longMiddle)}</p>
                <p>Long in backhand: {Number(data.serves.forehandServes.longBh) + Number(data.serves.backhandServes.longBh)}</p>
                <p>Half long in forehand: {Number(data.serves.forehandServes.halfLongFh)+ Number(data.serves.backhandServes.halfLongFh)}</p>
                <p>Half long in middle: {Number(data.serves.forehandServes.halfLongMiddle) + Number(data.serves.backhandServes.halfLongMiddle)}</p>
                <p>Half long in backhand: {Number(data.serves.forehandServes.halfLongBh) + Number(data.serves.backhandServes.halfLongBh)}</p>
                <p>Short in forehand: {Number(data.serves.forehandServes.shortFh) + Number(data.serves.backhandServes.shortFh)}</p>
                <p>Short in middle: {Number(data.serves.forehandServes.shortMiddle) + Number(data.serves.backhandServes.shortMiddle)}</p>
                <p>Short in backhand: {Number(data.serves.forehandServes.shortBh) + Number(data.serves.backhandServes.shortBh)}</p>
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
                <div>
                    <Button variant='secondary' label='Edit' onClick={editFhServes} />
                </div>
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
                <div>
                    <Button variant='secondary' label='Edit' onClick={editBhServes} />
                </div>
            </div>
            <div>
                <h2>Recieves</h2>
                <p>Long in forehand: {Number(data.recieves.forehandRecieves.longFh) + Number(data.recieves.backhandRecieves.longFh)}</p>
                <p>Long in middle: {Number(data.recieves.forehandRecieves.longMiddle) + Number(data.recieves.backhandRecieves.longMiddle)}</p>
                <p>Long in backhand: {Number(data.recieves.forehandRecieves.longBh) + Number(data.recieves.backhandRecieves.longBh)}</p>
                <p>Half long in forehand: {Number(data.recieves.forehandRecieves.halfLongFh)+ Number(data.recieves.backhandRecieves.halfLongFh)}</p>
                <p>Half long in middle: {Number(data.recieves.forehandRecieves.halfLongMiddle) + Number(data.recieves.backhandRecieves.halfLongMiddle)}</p>
                <p>Half long in backhand: {Number(data.recieves.forehandRecieves.halfLongBh) + Number(data.recieves.backhandRecieves.halfLongBh)}</p>
                <p>Short in forehand: {Number(data.recieves.forehandRecieves.shortFh) + Number(data.recieves.backhandRecieves.shortFh)}</p>
                <p>Short in middle: {Number(data.recieves.forehandRecieves.shortMiddle) + Number(data.recieves.backhandRecieves.shortMiddle)}</p>
                <p>Short in backhand: {Number(data.recieves.forehandRecieves.shortBh) + Number(data.recieves.backhandRecieves.shortBh)}</p>
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
                <div>
                    <Button variant='secondary' label='Edit' onClick={editFhRecieves} />
                </div>
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
                <div>
                    <Button variant='secondary' label='Edit' onClick={editBhRecieves} />
                </div>
            </div>
            <div>
                <h2>Rallies</h2>
                <p>Wins: {Number(data.rallies.ralliesMore.wins) + Number(data.rallies.ralliesLess.wins)}</p>
                <p>Loses: {Number(data.rallies.ralliesMore.loses) + Number(data.rallies.ralliesLess.loses)}</p>
                <h3>More than 3 balls</h3>
                <p>More than 3 balls wins: {Number(data.rallies.ralliesMore.wins)}</p>
                <p>More than 3 balls loses: {Number(data.rallies.ralliesMore.loses)}</p>
                <h3>Less than 3 balls</h3>
                <p>Less than 3 balls wins: {Number(data.rallies.ralliesMore.wins)}</p>
                <p>Less than 3 balls loses: {Number(data.rallies.ralliesMore.loses)}</p>
                <div>
                    <Button variant='secondary' label='Edit' onClick={editRallies} />
                </div>
            </div>
        </div>
    )
}