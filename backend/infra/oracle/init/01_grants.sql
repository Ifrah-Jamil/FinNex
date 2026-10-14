-- Runs once on first database create, connected to XEPDB1.
-- APP_USER from docker-compose already exists; ensure it can create objects.
BEGIN
  EXECUTE IMMEDIATE 'ALTER USER appuser QUOTA UNLIMITED ON USERS';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -1918 THEN
      RAISE;
    END IF;
END;
/
