const routes = [];

function register(method, path, desc = "") {
  routes.push({ method, path, desc });
}

function getRoutes() {
  return routes;
}

module.exports = { register, getRoutes };
