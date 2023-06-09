export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analyses: {
        Row: {
          date: string
          id: number
          opponentId: number
          ralliesId: number
          recievesId: number
          score: string
          servesId: number
        }
        Insert: {
          date: string
          id?: number
          opponentId: number
          ralliesId: number
          recievesId: number
          score: string
          servesId: number
        }
        Update: {
          date?: string
          id?: number
          opponentId?: number
          ralliesId?: number
          recievesId?: number
          score?: string
          servesId?: number
        }
      }
      backhandRecieves: {
        Row: {
          halfLongBh: string | null
          halfLongFh: string | null
          halfLongMiddle: string | null
          id: number
          longBh: string | null
          longFh: string | null
          longMiddle: string | null
          shortBh: string | null
          shortFh: string | null
          shortMiddle: string | null
        }
        Insert: {
          halfLongBh?: string | null
          halfLongFh?: string | null
          halfLongMiddle?: string | null
          id?: number
          longBh?: string | null
          longFh?: string | null
          longMiddle?: string | null
          shortBh?: string | null
          shortFh?: string | null
          shortMiddle?: string | null
        }
        Update: {
          halfLongBh?: string | null
          halfLongFh?: string | null
          halfLongMiddle?: string | null
          id?: number
          longBh?: string | null
          longFh?: string | null
          longMiddle?: string | null
          shortBh?: string | null
          shortFh?: string | null
          shortMiddle?: string | null
        }
      }
      backhandServes: {
        Row: {
          halfLongBh: string | null
          halfLongFh: string | null
          halfLongMiddle: string | null
          id: number
          longBh: string | null
          longFh: string | null
          longMiddle: string | null
          shortBh: string | null
          shortFh: string | null
          shortMiddle: string | null
        }
        Insert: {
          halfLongBh?: string | null
          halfLongFh?: string | null
          halfLongMiddle?: string | null
          id?: number
          longBh?: string | null
          longFh?: string | null
          longMiddle?: string | null
          shortBh?: string | null
          shortFh?: string | null
          shortMiddle?: string | null
        }
        Update: {
          halfLongBh?: string | null
          halfLongFh?: string | null
          halfLongMiddle?: string | null
          id?: number
          longBh?: string | null
          longFh?: string | null
          longMiddle?: string | null
          shortBh?: string | null
          shortFh?: string | null
          shortMiddle?: string | null
        }
      }
      forehandRecieves: {
        Row: {
          halfLongBh: string | null
          halfLongFh: string | null
          halfLongMiddle: string | null
          id: number
          longBh: string | null
          longFh: string | null
          longMiddle: string | null
          shortBh: string | null
          shortFh: string | null
          shortMiddle: string | null
        }
        Insert: {
          halfLongBh?: string | null
          halfLongFh?: string | null
          halfLongMiddle?: string | null
          id?: number
          longBh?: string | null
          longFh?: string | null
          longMiddle?: string | null
          shortBh?: string | null
          shortFh?: string | null
          shortMiddle?: string | null
        }
        Update: {
          halfLongBh?: string | null
          halfLongFh?: string | null
          halfLongMiddle?: string | null
          id?: number
          longBh?: string | null
          longFh?: string | null
          longMiddle?: string | null
          shortBh?: string | null
          shortFh?: string | null
          shortMiddle?: string | null
        }
      }
      forehandServes: {
        Row: {
          halfLongBh: string | null
          halfLongFh: string | null
          halfLongMiddle: string | null
          id: number
          longBh: string | null
          longFh: string | null
          longMiddle: string | null
          shortBh: string | null
          shortFh: string | null
          shortMiddle: string | null
        }
        Insert: {
          halfLongBh?: string | null
          halfLongFh?: string | null
          halfLongMiddle?: string | null
          id?: number
          longBh?: string | null
          longFh?: string | null
          longMiddle?: string | null
          shortBh?: string | null
          shortFh?: string | null
          shortMiddle?: string | null
        }
        Update: {
          halfLongBh?: string | null
          halfLongFh?: string | null
          halfLongMiddle?: string | null
          id?: number
          longBh?: string | null
          longFh?: string | null
          longMiddle?: string | null
          shortBh?: string | null
          shortFh?: string | null
          shortMiddle?: string | null
        }
      }
      opponents: {
        Row: {
          birthday: string
          country: string
          firstName: string
          id: number
          lastName: string
          middleName: string | null
        }
        Insert: {
          birthday: string
          country: string
          firstName: string
          id?: number
          lastName: string
          middleName?: string | null
        }
        Update: {
          birthday?: string
          country?: string
          firstName?: string
          id?: number
          lastName?: string
          middleName?: string | null
        }
      }
      rallies: {
        Row: {
          id: number
          ralliesLessId: number | null
          ralliesMoreId: number | null
        }
        Insert: {
          id?: number
          ralliesLessId?: number | null
          ralliesMoreId?: number | null
        }
        Update: {
          id?: number
          ralliesLessId?: number | null
          ralliesMoreId?: number | null
        }
      }
      ralliesLess: {
        Row: {
          id: number
          loses: string | null
          wins: string | null
        }
        Insert: {
          id?: number
          loses?: string | null
          wins?: string | null
        }
        Update: {
          id?: number
          loses?: string | null
          wins?: string | null
        }
      }
      ralliesMore: {
        Row: {
          id: number
          loses: string | null
          wins: string | null
        }
        Insert: {
          id?: number
          loses?: string | null
          wins?: string | null
        }
        Update: {
          id?: number
          loses?: string | null
          wins?: string | null
        }
      }
      recieves: {
        Row: {
          bhRecievesId: number
          fhRecievesId: number
          id: number
        }
        Insert: {
          bhRecievesId: number
          fhRecievesId: number
          id?: number
        }
        Update: {
          bhRecievesId?: number
          fhRecievesId?: number
          id?: number
        }
      }
      serves: {
        Row: {
          bhServesId: number
          fhServesId: number
          id: number
        }
        Insert: {
          bhServesId: number
          fhServesId: number
          id?: number
        }
        Update: {
          bhServesId?: number
          fhServesId?: number
          id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
