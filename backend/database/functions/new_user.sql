DROP FUNCTION new_user(
  email TEXT, password TEXT
);

CREATE OR REPLACE FUNCTION new_user(
  p_email TEXT, p_password TEXT
)
RETURNS INTEGER
AS $$
DECLARE

BEGIN

  IF exists(SELECT 1
            FROM users
            WHERE email = p_email) THEN
    RETURN -1;
  ELSE
    INSERT INTO users (email, password) VALUES (p_email, p_password);
    RETURN 0;
  END IF;

END;
$$ LANGUAGE plpgsql;