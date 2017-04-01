DROP FUNCTION get_user_id_by_phone(mobile_phone TEXT);

CREATE FUNCTION get_user_id_by_phone(p_mobile_phone TEXT) RETURNS INT as 'SELECT id
                FROM users WHERE mobile_number = p_mobile_phone;' language 'sql';