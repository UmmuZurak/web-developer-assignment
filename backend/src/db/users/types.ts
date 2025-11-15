export interface Address {
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: Address;
}
