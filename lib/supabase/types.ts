export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          theme_preference: 'light' | 'dark' | 'system'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          theme_preference?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          theme_preference?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          discount_base_price: number | null
          instructor: string | null
          image_url: string | null
          category: string | null
          features: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          discount_base_price?: number | null
          instructor?: string | null
          image_url?: string | null
          category?: string | null
          features?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          discount_base_price?: number | null
          instructor?: string | null
          image_url?: string | null
          category?: string | null
          features?: string[] | null
          created_at?: string
        }
      }
      ebooks: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          pdf_url: string | null
          cover_url: string | null
          category: string | null
          author: string | null
          pages: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          pdf_url?: string | null
          cover_url?: string | null
          category?: string | null
          author?: string | null
          pages?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          pdf_url?: string | null
          cover_url?: string | null
          category?: string | null
          author?: string | null
          pages?: number | null
          created_at?: string
        }
      }
      tests: {
        Row: {
          id: string
          title: string
          description: string | null
          duration: number
          total_marks: number
          is_free: boolean
          is_published: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          duration?: number
          total_marks?: number
          is_free?: boolean
          is_published?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          duration?: number
          total_marks?: number
          is_free?: boolean
          is_published?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          test_id: string
          question_text: string
          options: Json
          correct_answer: string
          explanation: string | null
          marks: number
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          test_id: string
          question_text: string
          options: Json
          correct_answer: string
          explanation?: string | null
          marks?: number
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          question_text?: string
          options?: Json
          correct_answer?: string
          explanation?: string | null
          marks?: number
          order_index?: number | null
          created_at?: string
        }
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string
          test_id: string
          answers: Json
          score: number | null
          total_marks: number | null
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          test_id: string
          answers: Json
          score?: number | null
          total_marks?: number | null
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          test_id?: string
          answers?: Json
          score?: number | null
          total_marks?: number | null
          completed_at?: string
        }
      }
      user_purchases: {
        Row: {
          id: string
          user_id: string
          course_id: string
          amount_paid: number | null
          purchased_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          amount_paid?: number | null
          purchased_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          amount_paid?: number | null
          purchased_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Course = Database['public']['Tables']['courses']['Row']
export type Ebook = Database['public']['Tables']['ebooks']['Row']
export type Test = Database['public']['Tables']['tests']['Row']
export type Question = Database['public']['Tables']['questions']['Row']
export type QuizResult = Database['public']['Tables']['quiz_results']['Row']
export type UserPurchase = Database['public']['Tables']['user_purchases']['Row']
