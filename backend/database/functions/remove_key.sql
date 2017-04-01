DROP FUNCTION remove_key(
  user_id INT, key_name TEXT
);

CREATE OR REPLACE FUNCTION remove_key(
  p_user_id INTEGER, p_key_name TEXT
)

RETURNS INTEGER
AS $$
DECLARE

BEGIN

  IF exists(SELECT 1
            FROM keys_collection
            WHERE user_id = p_user_id AND key_name = p_key_name) THEN
    DELETE FROM keys_collection WHERE user_id = p_user_id AND key_name = p_key_name;
    RETURN 0;
  ELSE
    RETURN -1;
  END IF;

END;
$$ LANGUAGE plpgsql;