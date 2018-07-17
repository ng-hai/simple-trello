import Firebase from '.'

export const createBoard = ({ name, background }) => {
  const currentUser = Firebase.auth.currentUser

  const boardKey = Firebase.database.ref('boards').push().key

  const boardData = {
    id: boardKey,
    userId: currentUser.uid,
    name,
    background,
  }

  return Firebase.database.ref('boards').update({
    [`/${boardKey}`]: boardData,
  })
}

export const getBoards = onBoardsChange => {
  const currentUser = Firebase.auth.currentUser
  const boardRefs = Firebase.database
    .ref('boards')
    .orderByChild('userId')
    .equalTo(currentUser.uid)

  boardRefs.on('value', snapshot => {
    const snapshotValue = snapshot.val() || {}
    const allBoards = Object.values(snapshotValue)
    onBoardsChange(allBoards)
  })

  return () => boardRefs.off('value')
}

export const getBoard = (boardId, onBoardChange) => {
  const boardRef = Firebase.database.ref('boards').child(boardId)
  boardRef.on('value', snapshot => {
    const snapshotValue = snapshot.val()
    onBoardChange(snapshotValue)
  })

  return () => boardRef.off('value')
}

export const deleteBoard = boardId => {
  Firebase.database
    .ref('boards')
    .child(boardId)
    .remove()
}

export const getBoardList = (boardId, onListChange) => {
  const listRef = Firebase.database
    .ref('list')
    .orderByChild('boardId')
    .equalTo(boardId)

  listRef.on('value', snapshot => {
    const snapshotValue = snapshot.val() || {}

    onListChange(snapshotValue)
  })

  return () => listRef.off('value')
}

export const getList = (listId, onListChange) => {
  const listRef = Firebase.database.ref('list').child(listId)

  listRef.on('value', snapshot => {
    const snapshotValue = snapshot.val() || {}

    onListChange(snapshotValue)
  })

  return () => listRef.off('value')
}

export const createList = ({ boardId, title, index }) => {
  const currentUser = Firebase.auth.currentUser

  const listRef = Firebase.database.ref('list')
  const listId = listRef.push().key

  return Firebase.database.ref('list').update({
    [`/${listId}`]: {
      title,
      id: listId,
      boardId,
      index,
      userId: currentUser.uid,
    },
  })
}

export const updateList = data => {
  return Firebase.database.ref('list').update(data)
}

export const deleteList = ({ listId }) => {
  const listRef = Firebase.database.ref('list').child(listId)

  listRef.off('value')

  listRef.remove(error => {
    if (!error) {
      const cardRefs = Firebase.database
        .ref('cards')
        .orderByChild('listId')
        .equalTo(listId).ref
      cardRefs.off('value')
      cardRefs.remove()
    }
  })
}

export const createCard = ({ listId, boardId, title, index, onComplete }) => {
  const cardRefs = Firebase.database.ref('list').child(listId)
  const cardId = cardRefs.push().key
  return Firebase.database
    .ref('list')
    .child(listId)
    .update(
      {
        [`cards/${cardId}`]: { listId, boardId, title, id: cardId, index },
      },
      onComplete
    )
}

export const getCard = ({ listId, cardId, onCardChange }) => {
  const cardRef = Firebase.database.ref(`list/${listId}/cards/${cardId}`)
  cardRef.on('value', snapshot => onCardChange(snapshot.val()))
  return () => cardRef.off('value')
}

export const updateCard = data => {
  const cardRef = Firebase.database.ref(`list/${data.listId}/cards/${data.id}`)
  return cardRef.update(data)
}

export const removeCard = () => {}
