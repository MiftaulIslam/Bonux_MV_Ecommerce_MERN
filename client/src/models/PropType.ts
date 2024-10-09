export interface loginProp{
    role: string;
}
export interface signupProp{
    role: string;
}

export interface loaderProp{
    status?: string;
}
export interface loaderProviderProp{
    children: any;
}

export interface starRatingProp{
    rating: any;
    onChange?: any;
    editable?: boolean;
}
export interface quickViewodalProp{
    data:any;
    onClose: any;
}
export interface multiLevelDropDownProp{
    items?:any;
    className: string;
}
export interface verticalMultiLevelDropDownProp{
    items:any;
    className?: string;
}

export interface MenuItemProp{
    label: string
    href: string
    link?:string
    subItems?: MenuItemProp[]

}

export interface responsiveSidebarProp{
    children:any;
    className?: string;

}
export interface carouselProp{
    children:any;
    autoplayInterval?: any;

}
export interface privateRouteProp{
    role:string;

}
export interface deleteModalProp{
    isOpen:any;
    onClose:any;
    onConfirm:any;

}
export interface profileDropdownMenusProp{
    data:any;

}
export interface userProfileProp{
    user:any;
}
export interface storeInfoModalProp{
    onClose:any;
}
