import { environment } from "../../../environments/environment";
export const SignUpEndPoint = `${environment.apiUrl}/auth/signup`;
export const SignInEndPoint = `${environment.apiUrl}/auth/signin`;
export const GetAllProductsEndPoint = `${environment.apiUrl}/products`;
export const GetSpecificProduct = (id: string) => `${environment.apiUrl}/products/${id}`;
