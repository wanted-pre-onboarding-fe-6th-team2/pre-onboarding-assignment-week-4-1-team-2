const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

app.db = router.db;
const rules = auth.rewriter({
  users: 660,
  userSetting: 660,
  accounts: 660,
});

const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOption));
app.use(rules);
app.use(auth);
app.use(router);

const JSON_SERVER_PORT = 4000;

app.listen(JSON_SERVER_PORT, () => {
  console.log(`JSON Server is running to http://localhost:${JSON_SERVER_PORT}`);
});
