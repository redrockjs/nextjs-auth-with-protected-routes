import {FormEvent} from "react";
import {useStateGroup} from "@/src/hooks/useStateGroup";
import {useLoginMutation} from "@/src/store/api/authEnhanced";

export function Login() {

    const [login] = useLoginMutation()

    const [formState, setFormState] = useStateGroup({
        email: "",
        password: "",
    });

    const resetForm = () => {
        setFormState.email('')
        setFormState.password('')
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            let res = await login({
                email: formState.email,
                password: formState.password
            }).unwrap()
            console.log(res)
        } catch (error) {
            console.log('Error: ', error)
        }

        resetForm()
    }

    return (
        <div>
            <h2 className={'font-bold text-3xl pb-4'}>
                Login
            </h2>

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

        </div>
    )
}