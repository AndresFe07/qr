export interface Depender {
    docType: string;
    docNumber: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
  }
  
export interface User {
    id: number;
    docType: string;
    docNumber: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
    depender: Depender[];
  }
  