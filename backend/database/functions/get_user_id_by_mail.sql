DROP FUNCTION get_user_id_by_mail(email TEXT);

CREATE FUNCTION get_user_id_by_mail(p_email TEXT) RETURNS INT as 'SELECT id
                FROM users WHERE email = p_email;' language 'sql';