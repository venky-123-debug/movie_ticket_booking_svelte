module.exports = {
  port: 5000,
  directory: "public",
  spa: "index.html",
  logFormat: "dev",
  rewrite: [
    {
      from: "/api/(.*)",
      to: "http://127.0.0.1:7500/$1",
    }
  ],
}
