export interface UserState {
    isAuthenticated: boolean;
    user: any | null; 
    loading: boolean;
  }
  
  export interface TogglebarState {
    isOpen: boolean;
  }
  export interface UserAddress {
    _id:string;
    address:string;
    region:string;
    city:string;
    zone:string;
    defaultBilling:boolean;
    defaultShipping:boolean;
  }