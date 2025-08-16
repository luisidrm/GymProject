export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path", "/dashboard", "/api/shop", "/api/clients", "/api/createClients", "/api/users", "/api/trainers", "/api/cuadre","/api/reservations"] }