
export const auth={
  isAuthenticated:false,
  login(cb){
      this.isAuthenticated = true
  },
  logout(cb){
      this.isAuthenticated = false
  }
}
