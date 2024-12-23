const UserApi = {
  
  borrowBook: async (isbn, userId) => {
    const res = await fetch("https://online-library-management-system-backend.onrender.com/v1/user/borrow", {
      method: "POST",
      body: JSON.stringify({ isbn, userId }),
      headers: { "Content-Type": "application/json" },
      credentials: 'include' 
    })
    return res.json()
  },
  returnBook: async (isbn, userId) => {
    const res = await fetch("https://online-library-management-system-backend.onrender.com/v1/user/return", {
      method: "POST",
      body: JSON.stringify({ isbn, userId }),
      headers: { "Content-Type": "application/json" },
      credentials: 'include' 
    })
    return res.json()
  },
  getBorrowBook: async () => {
    const res = await fetch("https://online-library-management-system-backend.onrender.com/v1/user/borrowed-books", { method: "GET", credentials: 'include'})
    return  res.json()
  },
  login: async (username, password) => {
    const res = await fetch("https://online-library-management-system-backend.onrender.com/v1/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    })
    return await res.json()
  },
  getProfile: async () => {
    const res = await fetch("https://online-library-management-system-backend.onrender.com/v1/user/profile", { method: "GET", credentials: 'include' })
    return res.json()
  },
  logout: async () => {
    const res = await fetch("https://online-library-management-system-backend.onrender.com/v1/user/logout", { method: "GET",  credentials: 'include' })
    return res.json()
  },
}


export default UserApi;

// module.exports = { UserApi }
