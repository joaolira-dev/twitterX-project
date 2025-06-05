export const getPublicURL = (url: string) => {
   return `${process.env.BASE_URL}/uploads/${url}`
}

export const avatarURL = (url: string) => {
   return `${process.env.BASE_URL}/uploads/avatar/${url}`
}
export const coverURL = (url: string) => {
   return `${process.env.BASE_URL}/uploads/cover/${url}`
}