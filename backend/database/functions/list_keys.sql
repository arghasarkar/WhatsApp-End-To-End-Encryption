DROP FUNCTION list_keys(id INT);

CREATE TYPE key_info AS (key_name TEXT, key TEXT);

CREATE FUNCTION list_keys(p_id INT) RETURNS SETOF key_info as 'SELECT key_name, key
                FROM keys_collection WHERE user_id = p_id;' language 'sql';