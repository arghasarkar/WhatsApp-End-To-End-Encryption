DROP FUNCTION list_keys(id INT);

CREATE FUNCTION list_keys(p_id INT) RETURNS TEXT as 'SELECT key
                FROM keys_collection WHERE user_id = p_id;' language 'sql';