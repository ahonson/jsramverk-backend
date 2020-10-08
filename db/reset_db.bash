$(> db/texts.sqlite)
cat db/migrate.sql | sqlite3 db/texts.sqlite
