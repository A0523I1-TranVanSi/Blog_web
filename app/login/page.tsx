"use client"
import React  from "react";
import Input from "@/components/input/Input";
import { FormEvent, useState } from "react";
import axios from "axios";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface InitialStateProps {
    
    email:string,
    password:string
}


const initialState:InitialStateProps = {
    email: '',
    password:''
}

export default function page(){

        const [state,setState] = useState(initialState)
        const router = useRouter()

        function handleChange(e:any){
            setState({ ...state, [e.target.name]: e.target.value })
        }

        const onSubmit = (event:FormEvent) => {
            event.preventDefault()

            signIn('credentials', {
               ...state,
               redirect:false,
            })
            .then((callback) => {
       
               if(callback?.ok) {
                   router.refresh()
               }
       
               if(callback?.error) {
                   throw new Error('Wrong Credentials')
               }
            })
            router.push('/')
        }


    return(
        <form onSubmit={onSubmit} className="text-center" >
            <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
                <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email}/>
                <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password}/>
                <button type="submit">Submit</button>
            </div>
        <div>
          <div>Haven't you got an account yet ? <Link href='/register'>Register</Link></div>
        </div>
        </form>
    )
}