import { createClient } from '@supabase/supabase-js'

const supabaseUrl =  "https://wmscfslueuoyfiodbign.supabase.co";
const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtc2Nmc2x1ZXVveWZpb2RiaWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNDA4ODUsImV4cCI6MjAwNjgxNjg4NX0.qNpjXLxmE3VdtyoBxlHlIefwQkKOHgxkIWvr_F9xxSY";
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;