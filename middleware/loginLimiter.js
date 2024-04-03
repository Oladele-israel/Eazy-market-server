import rateLimit from "express-rate-limit";
const LoginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  //max: 5, // this limit each IP request to 5 login request per 'window per minute to harden security
  limit: 5, // Limit each IP to 15 requests per `window` (here, per  minute).
  message: {
    message:
      "too many request from this IP, please take a 1 minute pause and try again",
  },
  standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
export default LoginLimiter;
