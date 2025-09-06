import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zymfjnsucdtyvbraitgk.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5bWZqbnN1Y2R0eXZicmFpdGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMjE5MDMsImV4cCI6MjA3MjY5NzkwM30.B_SLgYeEGHn5VGcrYo1Ew6Id62pPhear5W58pb5JFaE"; 
export const supabase = createClient(supabaseUrl, supabaseKey);
