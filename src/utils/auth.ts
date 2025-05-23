 import bcrypt from 'bcrypt'

 export const hashPassword = async (password:string) => {
    const hashed = await bcrypt.hash(password, 10);
    return await bcrypt.hash(password,hashed)
 }


 export const checkPassword = async (password:string, hash:string) => {
   return await bcrypt.compare(password, hash);
 }
