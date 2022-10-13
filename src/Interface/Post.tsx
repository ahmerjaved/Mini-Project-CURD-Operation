import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";

interface Post 
{
    employeeId: string | ReactFragment | ReactPortal | null | undefined; 
    firstName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
    lastName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
    dateOfBirth: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
    phoneNumber: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
    email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
    show: boolean ;
    close: () => void;

}

export default Post;