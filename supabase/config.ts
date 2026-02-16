import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sftqxaaxueveqnoozlad.supabase.co';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
