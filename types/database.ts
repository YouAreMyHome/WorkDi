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
          full_name: string
          avatar_url: string | null
          bio: string | null
          role: 'user' | 'owner' | 'admin'
          reputation_score: number
          is_banned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          role?: 'user' | 'owner' | 'admin'
          reputation_score?: number
          is_banned?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          role?: 'user' | 'owner' | 'admin'
          reputation_score?: number
          is_banned?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      cafes: {
        Row: {
          id: string
          owner_id: string | null
          name: string
          slug: string
          description: string | null
          address: string
          ward: string | null
          district: string | null
          city: string | null
          location: unknown
          price_range: Json | null
          policies: Json | null
          operating_hours: Json | null
          cover_image: string | null
          gallery: Json | null
          total_reviews: number
          avg_rating: number
          avg_wifi_speed: number
          status: 'draft' | 'pending_review' | 'active' | 'temporarily_closed' | 'permanently_closed'
          is_verified: boolean
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          owner_id?: string | null
          name: string
          slug: string
          description?: string | null
          address: string
          ward?: string | null
          district?: string | null
          city?: string | null
          location: unknown
          price_range?: Json | null
          policies?: Json | null
          operating_hours?: Json | null
          cover_image?: string | null
          gallery?: Json | null
          total_reviews?: number
          avg_rating?: number
          avg_wifi_speed?: number
          status?: 'draft' | 'pending_review' | 'active' | 'temporarily_closed' | 'permanently_closed'
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          owner_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          address?: string
          ward?: string | null
          district?: string | null
          city?: string | null
          location?: unknown
          price_range?: Json | null
          policies?: Json | null
          operating_hours?: Json | null
          cover_image?: string | null
          gallery?: Json | null
          total_reviews?: number
          avg_rating?: number
          avg_wifi_speed?: number
          status?: 'draft' | 'pending_review' | 'active' | 'temporarily_closed' | 'permanently_closed'
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: []
      }
      amenities: {
        Row: {
          id: number
          category: string
          name: string
          icon_name: string | null
          created_at: string
        }
        Insert: {
          id?: number
          category: string
          name: string
          icon_name?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          category?: string
          name?: string
          icon_name?: string | null
          created_at?: string
        }
        Relationships: []
      }
      cafe_amenities: {
        Row: {
          cafe_id: string
          amenity_id: number
          note: string | null
        }
        Insert: {
          cafe_id: string
          amenity_id: number
          note?: string | null
        }
        Update: {
          cafe_id?: string
          amenity_id?: number
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cafe_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cafe_amenities_cafe_id_fkey"
            columns: ["cafe_id"]
            referencedRelation: "cafes"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          cafe_id: string
          user_id: string
          overall_rating: number
          workspace_rating: number | null
          service_rating: number | null
          wifi_speed_mbps: number | null
          speedtest_image_url: string | null
          noise_level: 'quiet' | 'moderate' | 'noisy' | 'very_noisy' | null
          content: string
          gallery: Json | null
          helpful_votes: number
          is_hidden: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cafe_id: string
          user_id: string
          overall_rating: number
          workspace_rating?: number | null
          service_rating?: number | null
          wifi_speed_mbps?: number | null
          speedtest_image_url?: string | null
          noise_level?: 'quiet' | 'moderate' | 'noisy' | 'very_noisy' | null
          content: string
          gallery?: Json | null
          helpful_votes?: number
          is_hidden?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cafe_id?: string
          user_id?: string
          overall_rating?: number
          workspace_rating?: number | null
          service_rating?: number | null
          wifi_speed_mbps?: number | null
          speedtest_image_url?: string | null
          noise_level?: 'quiet' | 'moderate' | 'noisy' | 'very_noisy' | null
          content?: string
          gallery?: Json | null
          helpful_votes?: number
          is_hidden?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_cafe_id_fkey"
            columns: ["cafe_id"]
            referencedRelation: "cafes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      get_nearby_cafes: {
        Args: {
          lat: number
          long: number
          radius_km: number
        }
        Returns: {
          id: string
          name: string
          slug: string
          address: string
          district: string
          city: string
          cover_image: string
          rating: number
          reviews_count: number
          dist_meters: number
          latitude: number
          longitude: number
        }[]
      }
      search_cafes: {
        Args: {
          lat: number
          long: number
          radius_km: number
          amenity_ids?: number[] | null
          min_price?: number | null
          max_price?: number | null
          is_open?: boolean | null
        }
        Returns: {
          id: string
          name: string
          slug: string
          address: string
          district: string
          city: string
          cover_image: string
          rating: number
          reviews_count: number
          dist_meters: number
          latitude: number
          longitude: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
