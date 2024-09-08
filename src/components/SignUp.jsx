import React,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import {login} from '../store/authSlice'
import { Link,useNavigate } from 'react-router-dom'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError] = useState("")
    const {register,handleSubmit} = useForm()

    const create = async(data) => {
        setError('')
        try {
           const userData = await authService.createAccount(data)
           if(userData){
           userData = await authService.getCurrentUser(userData)
           if(userData) dispatch(login(userData))
            navigate("/")
           }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
     <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg 
            bg-gray-100 rounded-xl p-10 border border-black/10`}>

             <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
              <Logo width='100%'/>
            </span>
            </div>

            <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-base text-black/60'>

           Already have an account?&nbsp;
          <Link
          to="/login"
          className='font-medium text-primary transition-all duration-200
          hover:underline'
          >
            Sign In
          </Link>
          
          </p>
          {error && <p className='text-red-500 text-center'>
            {error}
            </p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label="Name"
                    placeholder="Enter your name"
                    {...register("name" ,{
                        required:true
                    })}
                    />
                    <Input 
                    label="Email: "
                    placeholder="Enter your email"
                    type = "email"
                    {...register("email",{
                        required:true,
                        validate:{
                             matchPatern : (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)
                    || "Email adress must be a valid email address"
                        }
                    })}
                    />

                    <Input 
                    label = "Password: "
                    type = "password"
                    {...register("password",{
                        required:true,
                        validate:{
                            matchPatern:(value)=> /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
                            ||"Password Must be at least 8 characters Must conatain 1 uppercase letter 1 lowercase letter and 1 number can contain special character"
                        }
                    })}
                    />

                    <Button type='submit'
                    className='w-full'>Create Account</Button>
                </div> 
            </form>

            </div>

     </div>
  )
}

export default SignUp