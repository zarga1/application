export class User {

  public email:      string;
  public isLoggedIn: boolean;

  constructor(user?: any) {
    this.email      = user ? user.email : '';
    this.isLoggedIn = this.email ? true : false;
  }

  public save(): void {
    localStorage.setItem('currentUser', JSON.stringify(this));
  }

  public add(): void {
    let users: Array<User> = JSON.parse(localStorage.getItem('users'));
    if(users == null)
      users = new Array<User>();
    users.push(this);
    localStorage.setItem('users', JSON.stringify(users));
  }

  public exist(): boolean {
    let users: Array<User> = JSON.parse(localStorage.getItem('users'));
    if(users != null) {
      for(let i=0; i<users.length; i++) {
        if(users[i].email.localeCompare(this.email) == 0)
          return true;
      }
    }
    return false;
  }

  /**
   * Saves user into local storage
   */
  public static remove(): void {
    localStorage.setItem('currentUser', null);
  }
  
}