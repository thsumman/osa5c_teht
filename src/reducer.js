const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ',state)
  console.log('action', action)
  const compare = (a,b) => {
    if (a.votes < b.votes) {
      return 1
    }
    else if (a.votes > b.votes) {
      return -1
    }
    else {
      return 0
    }
  }
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      console.log(action)
      const anecToChange = state.find(n => n.id === id)
      const changedAnec = { ...anecToChange, votes: anecToChange.votes+1 }
      const anecdotesApu = state.map(anec => anec.id !== id ? anec : changedAnec )
      anecdotesApu.sort(compare)
      state = anecdotesApu
      return state
      //return state.map(anec => anec.id !== id ? anec : changedAnec )
    case 'NEW_ANECDOTE':
      const newObject = {
        content: action.data.content,
        id: getId(),
        votes: 0
      }
      const anecdotesApu2 = state.concat(newObject)
      anecdotesApu2.sort(compare)
      state = anecdotesApu2
      return state
    default: return state
  }
}

export default reducer