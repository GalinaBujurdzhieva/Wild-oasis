import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          avatar: "",
        },
      },
    });
  
    if (error) throw new Error(error.message);
  
    return data;
  }

export async function login({email, password}){
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error){
        throw new Error(error.message)
      }

      return data;
}

export async function getCurrentUser(){
    const {data: session} = await supabase.auth.getSession();

    if(!session.session) return null;

    const {data, error} = await supabase.auth.getUser();

    if (error){
        throw new Error(error.message)
    }

    return data?.user
}

export async function updateCurrentUser({fullName, password, avatar}){
let updatedUser;
if (password) updatedUser = {password};
if (fullName) updatedUser = {data: {fullName}};
const { data, error } = await supabase.auth.updateUser(updatedUser);

if (error) throw new Error(error.message)
  if (!avatar) return data;

const fileName = `avatar-${data.user.id}-${Math.random()}`
const {error: storageError} = await supabase.storage.from('avatars').upload(fileName, avatar)
if (storageError) throw new Error(storageError.message);

const {error: error2, data: finalUploadedUser} = await supabase.auth.updateUser({
  data: {
    avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
  }
})
if(error2) throw new Error(error2.message);
return finalUploadedUser;
}

export async function logout(){
    const {error} = await supabase.auth.signOut();
    if (error){
        throw new Error(error.message);
    }
}