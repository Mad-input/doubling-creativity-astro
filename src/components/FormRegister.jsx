export default function FormRegister() {
  return (
    <form id="form">
      <h2 className="title-form">Sign Up</h2>
      <div className="logo">
        <img src="/img/logo-icon.svg" alt="logo" />
      </div>
      <div className="containt-input">
        <input type="text" placeholder="" />
        <label>Username</label>
      </div>
      <div className="containt-input">
        <input type="email" placeholder="" />
        <label>Email</label>
      </div>
      <div className="containt-input">
        <input type="password" placeholder="" />
        <label>Password</label>
      </div>
      <button type="submit" className="btn-submit">Register</button>
    </form>
  )
}
