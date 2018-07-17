import Firebase from '.'

export const createUser = ({ user }) => {
  if (user) {
    Firebase.database.ref(`/users/${user.uid}`).set({
      id: user.uid,
    })
  }
}

export const deleteUser = async () => {
  const currentUser = Firebase.auth.currentUser
  await Firebase.database
    .ref('list')
    .orderByChild('userId')
    .equalTo(currentUser.uid)
    .ref.remove()
  await Firebase.database
    .ref('/boards')
    .orderByChild('userId')
    .equalTo(currentUser.uid)
    .ref.remove()
  await Firebase.database.ref(`/users/${currentUser.uid}`).remove()
  await currentUser.delete()
}
