const username = 'test'
const email = 'test@abc.com'
const password = 'something'
const newEmail = 'new.test@abc.com'
const newPassword = 'new_password'
const newLastTutorial = 3

module.exports = {
  username: username,
  email: email,
  password: password,
  newEmail: newEmail,
  newPassword: newPassword,
  newLastTutorial: newLastTutorial,
  fakeUser: {
    username: username,
    email: email,
    password: password,
    last_tutorial: 0
  },
  fakeUpdatedUser: {
    username: username,
    email: newEmail,
    password: newPassword,
    last_tutorial: newLastTutorial
  }
}
