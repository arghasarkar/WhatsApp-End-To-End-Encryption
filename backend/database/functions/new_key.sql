DROP FUNCTION new_key(
  user_id INT, key TEXT
);

CREATE OR REPLACE FUNCTION new_key(
  p_user_id INTEGER, p_key TEXT
)

RETURNS INTEGER
AS $$
DECLARE

BEGIN

  IF exists(SELECT 1
            FROM keys_collection
            WHERE user_id = p_user_id) THEN
    UPDATE keys_collection SET key = p_key WHERE user_id = p_user_id;
  ELSE
    INSERT INTO keys_collection (key, user_id) VALUES (p_key, p_user_id);
  END IF;

  RETURN 1;

END;
$$ LANGUAGE plpgsql;