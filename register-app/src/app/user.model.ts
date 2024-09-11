export interface Depender {
    princUser: string;
    id: string;
    docType: string;
    docNumber: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
  }
  
export interface User {
    id: string;
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
  