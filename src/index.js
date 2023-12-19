const { newEnforcer } = require('casbin');
const express = require('express');
const { resolveUserRoles } = require('./utils');
const app = express();

app.use(express.json());

const hasPermission = action => {
  return async (req, res, next) => {
    const { user } = req.body;
    const { feature } = req.params;
    const userRoles = resolveUserRoles(user);

    const e = await newEnforcer(`${__dirname}/config/rbac_model.conf`, `${__dirname}/config/rbac_policy.csv`);

    const allowed = await userRoles.reduce(async (perms, role) => {
      const acc = await perms;
      if (acc) return true;
      const can = await e.enforce(role, feature, action);
      if (can) return true;
    }, false);

    allowed ? next() : res.status(403).send('Forbidden').end();
  };
};

app.get('/api/:feature', hasPermission('gather'), (req, res) => {
  res.send('has Permission');
});

app.put('/api/:feature', hasPermission('consume'), (req, res) => {
  res.send('has Permission');
});

app.delete('/api/:feature', hasPermission('destroy'), (req, res) => {
  res.send('has Permission');
});

app.listen(8080, () => {
  console.log('listening on port 8080');
});
