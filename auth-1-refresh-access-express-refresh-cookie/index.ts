import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import path from 'path';

const PORT = 4001;
const SECRET = 'mysecret';
const MY_ACCESS_TOKEN = 'MY_ACCESS_TOKEN';
const MY_REFRESH_TOKEN = 'MY_REFRESH_TOKEN';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Keeps track of refresh tokens belonging to each user
const refreshTokenMap = new Map<string, string[]>();

app.use((req, res, next) => {
  console.log('----------------------');
  return next();
});

app.get('/', (req, res) => {
  const accessToken = req.cookies[MY_ACCESS_TOKEN];
  if (!accessToken) {
    res.status(200).sendFile(path.resolve(___dirname, '../', 'public'));
  }
  res.redirect('/profile');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'akshit' && password === '123456') {
    const accessToken = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ username }, SECRET, { expiresIn: '30d' });

    const refreshTokens = refreshTokenMap.get(username) ?? [];
    refreshTokens.push(refreshToken);
    refreshTokenMap.set(username, refreshTokens);

    res.cookie(MY_ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    res.cookie(MY_REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/refresh',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.redirect('/profile');
  } else {
    return res.redirect('/');
  }
});

// Handle the refesh refreshTokenMap, Needs to be before the authentication
// middleware so we can get a new access token when the refresh token has expired.

app.get('/refresh', (req, res) => {
  const refreshToken = req.cookies[MY_REFRESH_TOKEN];

  if (!refreshToken) {
    console.log('Refresh token not found, sending them to login page');
    return res.redirect('/');
  }

  try {
    const { username } = jwt.verify(refreshToken, SECRET) as {
      username: string;
    };
    const accessToken = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.cookie(MY_ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
    console.log('New Access token generated');
    return res.status(200).send('<h1>New Access token generated!');
  } catch (error) {
    console.log('Invalid refresh token');
    res.clearCookie(MY_REFRESH_TOKEN);
    return res.redirect('/');
  }
});

// Authorization Middleware
app.use((req: Request, res: Response, next) => {
  const accessToken = req.cookies(MY_ACCESS_TOKEN);
  if (!accessToken) {
    return res.redirect('/');
  }

  try {
    const user = jwt.verify(accessToken, SECRET);
    res.locals.user = user;
    console.log('Access token valid');
    return next();
  } catch (error) {
    console.log('Access token invalid, need to get a new one');
    res.clearCookie(MY_ACCESS_TOKEN);
    return res.status(401).send('<h1>Unauthorized</h1>');
  }
});

app.get('/profile', (req, res) => {
  const { username } = res.locals.user;
  return res.send(`<h1>hello ${username}!</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
