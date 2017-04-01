DROP FUNCTION new_user(
  email TEXT, password TEXT, full_name TEXT, mobile_number TEXT
);

CREATE OR REPLACE FUNCTION new_user(
  p_email TEXT, p_password TEXT, p_full_name TEXT, p_mobile_number TEXT
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
    INSERT INTO users (email, password, full_name, mobile_number) VALUES (p_email, p_password, p_full_name, p_mobile_number);
    RETURN 0;
  END IF;

END;
$$ LANGUAGE plpgsql;