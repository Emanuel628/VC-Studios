// Set before any other module (via dotenv/config in index.ts) can populate these,
// since dotenv does not override already-set variables. This keeps tests pointed at
// the dedicated test database instead of the local dev database.
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://postgres@localhost:5432/platinum_vc_studios_test';
process.env.BETTER_AUTH_SECRET = 'test-secret-do-not-use-outside-tests-0000000000';
process.env.BETTER_AUTH_URL = 'http://localhost:3002';
process.env.CLIENT_ORIGIN = 'http://localhost:5183';
