export function getNow(req) {
  if (process.env.TEST_MODE === "1") {
    const headerTime = req.headers["x-test-now-ms"];
    if (headerTime) {
      return new Date(Number(headerTime));
    }
  }
  return new Date();
}
