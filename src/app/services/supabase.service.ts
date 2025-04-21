import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabase: SupabaseClient<any, "public", any>;

  constructor() { 
    this.supabase = createClient(
      "https://rkbqoxoodmpgkbvnaitz.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYnFveG9vZG1wZ2tidm5haXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NTU1NDcsImV4cCI6MjA2MDUzMTU0N30.hF-2KoXyWQhilKGe-Rtl4tvpB_1jrHrYktOXIh8EVDk"
    );
  }
}
