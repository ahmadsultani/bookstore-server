const createTokenUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    balance: user.balance,
  };
}

module.exports = createTokenUser;
