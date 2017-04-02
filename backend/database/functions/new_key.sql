DROP FUNCTION new_key(
  user_id INT, key TEXT, key_name TEXT
);

CREATE OR REPLACE FUNCTION new_key(
  p_user_id INTEGER, p_key TEXT, p_key_name TEXT
)

RETURNS INTEGER
AS $$
DECLARE

BEGIN

  IF exists(SELECT 1
            FROM keys_collection
            WHERE user_id = p_user_id AND key_name = p_key_name) THEN
    RETURN -1;
  ELSE
    INSERT INTO keys_collection (key, user_id, key_name) VALUES (p_key, p_user_id, p_key_name);
    RETURN 0;
  END IF;

END;
$$ LANGUAGE plpgsql;