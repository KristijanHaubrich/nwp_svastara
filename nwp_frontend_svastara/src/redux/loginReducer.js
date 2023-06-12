const initialState = {
    isLoggedIn:false
}
function login() {
    return {
      type: 'LOGIN',
    }
  }

  function logout() {
    return {
      type: 'LOGOUT'
    }
  }

export {login,logout}

export const loginReducer = (state = initialState,action) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                isLoggedIn: true
            }
        case "LOGOUT":
            return{
                ...state,
                isLoggedIn: false
            }
        default: return state;        
    }
}