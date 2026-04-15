import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://micgjnhqfelnomifbcru.supabase.com";
const supabaseKey = "sb_publishable_BHkXWV8BvE0COdbA85WgCw_Fr2frKMJ";

export const supabase = createClient(supabaseUrl, supabaseKey);