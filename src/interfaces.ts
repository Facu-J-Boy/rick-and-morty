export interface character {
  id?: number;
  name: string;
  image: string;
  gender: string | undefined;
  origin: { name: string };
}

export interface notification {
  type: 'error' | 'success';
  text: string;
}

export interface userForm {
  userName?: string;
  email: string;
  password: string;
}
