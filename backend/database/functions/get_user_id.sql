DROP FUNCTION get_user_id(email TEXT, password TEXT);

CREATE FUNCTION get_user_id(p_email TEXT, p_password TEXT) RETURNS INT as 'SELECT id
                FROM users WHERE email = p_email AND password = p_password;' language 'sql';