"use server"

import { RegisterForm } from "./types";

export async function handleRegister(data:RegisterForm){

  const response = await fetch(`${process.env.API_URL}/user`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })

  const user = await response.json()
  console.log("reponse:", response.status);
  console.log("user:", user);
  return {user, statusCode: response.status}
}