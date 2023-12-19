const users = [
  {
    id: 'alice@gmail',
    roles: ['user'],
  },
  {
    id: 'john@company',
    roles: ['underwriter'],
  },
  {
    id: 'rick@company',
    roles: ['admin'],
  },
];

const resolveUserRoles = user => {
  //Would query DB
  const userWithRole = users.find(u => u.id === user);
  return userWithRole.roles;
};

module.exports = {
  resolveUserRoles,
};
