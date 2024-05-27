export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: number;
  roleName: string;

  constructor(id: number, username: string, password: string, email: string, role: number, roleName: string) {  
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.roleName = roleName;
  }

}