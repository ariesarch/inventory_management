'use client'
import Image from 'next/image'
import Link from 'next/link'
import { user,logo } from '../atoms/icons'
import { useModalAction } from '@/contexts/modal.context'
import { useUI } from '@/contexts/ui.context'
import CustomButton from '../atoms/CustomButton'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useLogoutMutation } from '@/hooks/mutations/auth/use-logout.mutation'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const route = useRouter();
    const {isAuthorize,unauthorize} = useUI();
    const [auth, setAuth] = useState<boolean>(false);
    const {openModal} = useModalAction()
    const { mutate: logout } = useLogoutMutation()
    const handleLogin = () => {
        console.log("handleLogin called"); // Debugging statement
        openModal('LOGIN_VIEW');
    };
    const handleRegister = () => {
        return openModal('REGISTER')
    }
    const logoutMutation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        logout(
            {},
            {
                onSuccess: ({ status, message }) => {
                    Cookies.remove('auth_token')
                    unauthorize()
                    route.push('/')
                },
            }
        )
    }
    useEffect(()=>{
        setAuth(isAuthorize)
    },[isAuthorize])
    return (
        <div className="sticky top-0 z-10 bg-shades-0">
            <nav className="nav-container max-width px-4 md:px-12 py-6">
                <Link href="/" className="flex items-center gap-3 cursor-pointer">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={52}
                        height={50}
                    />
                    <span className="text-neutral-500 paragraph-1">E-commerce</span>
                </Link>
                {!auth ? (
                <div className='flex gap-1'>
                    <CustomButton variant="solid" size="sm" colorschema="primary" onClick={handleLogin}>Login</CustomButton>
                    <CustomButton variant="solid" size="sm" colorschema="primary" onClick={handleRegister}>Register</CustomButton>
                </div>
                ):(
                        <div className="dropdown inline-block relative">
                            <button className="mt-1">
                                <Image
                                    className="cursor-pointer"
                                    src={user}
                                    alt="User Icon"
                                    width={32}
                                    height={32}
                                />
                            </button>
                            <ul className="dropdown-menu absolute hidden right-0 w-max text-gray-700 pt-1">
                                <li className="">
                                    <Link
                                        className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                        href="/order"
                                    >
                                        My orders
                                    </Link>
                                </li>
                                <li className="">
                                    <span
                                        onClick={logoutMutation}
                                        className="cursor-pointer rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                    >
                                        Logout
                                    </span>
                                </li>
                            </ul>
                        </div>
                )}
            </nav>
        </div>
    )
}
export default Navbar;