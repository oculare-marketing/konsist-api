module.exports = {
  apps : [{
    name   : "api.oculareoftalmo.med.br",
    script : "./dist/server.js",
    watch : true,
    env_production: {
      NODE_ENV: "production",
      PORT: 3333    
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}
