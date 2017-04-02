DROP FUNCTION get_user_object(id INT);

CREATE FUNCTION get_user_object(p_id INT) RETURNS SETOF users as 'SELECT *
                FROM users WHERE id = p_id;' language 'sql';