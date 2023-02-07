export type Userdata = {
  id: number;
  age?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  username?: string;
  email?: string;
  country?: { name: string; code: string };
  isOnline?: string;
  role?: string;
  telephone?: string;
  birthday?: string;
};
