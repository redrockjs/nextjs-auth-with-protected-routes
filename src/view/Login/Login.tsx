import {FormEvent} from "react";
import {useStateGroup} from "@/src/hooks/useStateGroup";
import {useLoginMutation} from "@/src/store/api/authEnhanced";
import {useAppDispatch} from "@/src/hooks/redux";
import {delCredentials, setCredentials} from "@/src/store/authSlice";
import {getCookie} from 'cookies-next';
import {useRouter} from "next/router";
import {apiSlice} from "@/src/store/apiSlice";

export function Login() {

  const router = useRouter()
  const [login] = useLoginMutation()

  const dispatch = useAppDispatch()

  const [formState, setFormState] = useStateGroup({
    email: "",
    password: "",
  });

  const resetForm = () => {
    setFormState.email('')
    setFormState.password('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    login({
      email: formState.email,
      password: formState.password
    })
      .unwrap()
      .then((res) => {
        console.log(res)
        dispatch(setCredentials(res))
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
      .finally(() => {
        resetForm()
      })
  }

  const handleLogout = () => {
    dispatch(delCredentials({}))
    dispatch(apiSlice.util.resetApiState()); // полный сброс кэша RTK при выходе из системы
    router.push('/')
  }

  const isLogin = !!getCookie('accessToken')

  return (
    <div>
      <h2 className={'font-bold text-3xl pb-4'}>
        Login
      </h2>

      {isLogin
        ? <>
          <p>You are authorized</p>
          <button className={'self-end w-[100px] border border-gray-500 rounded'} onClick={handleLogout}>
            Logout
          </button>
        </>
        : <>
          <form className={'flex flex-col gap-2 w-[300px] py-4'} onSubmit={handleSubmit}>
            <input
              className={'p-1 rounded'}
              type="text"
              placeholder='Email'
              autoComplete='on'
              value={formState.email}
              onChange={e => setFormState.email(e.target.value)}
            />

            <input
              className={'p-1 rounded'}
              type="password"
              placeholder='Password'
              autoComplete='on'
              value={formState.password}
              onChange={e => setFormState.password(e.target.value)}
            />

            <button className={'self-end w-[100px] border border-gray-500 rounded'}>
              Send
            </button>
          </form>
        </>
      }
    </div>
  )
}