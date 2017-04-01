DROP FUNCTION get_user_id_by_name(full_name TEXT);

CREATE FUNCTION get_user_id_by_name(p_full_name TEXT) RETURNS INT as 'SELECT id
                FROM users WHERE full_name = p_full_name;' language 'sql';