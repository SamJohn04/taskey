import Link from "next/link";

export default function SignupPage() {
    return (
        <main className="bg-white w-screen max-w-4xl mx-auto mt-[10vh] md:mt-[25vh] px-4 py-8 md:p-8 rounded-md flex flex-col gap-4">
            <h2 className="text-lg md:text-2xl">Sign Up</h2>
            <form className="grid grid-cols-4 items-center gap-1 md:gap-6 py-4" >
                <><label className="mt-2 md:mt-0 w-full col-span-4 md:col-span-1" htmlFor="email">Email Address:</label><input className="mb-2 md:mb-0 col-span-4 md:col-span-3 w-full border border-gray p-1" placeholder="Email Address" name='email' required type="email"/></>
                <><label className="mt-2 md:mt-0 w-full col-span-4 md:col-span-1" htmlFor="password">Password:</label><input className="mb-2 md:mb-0 col-span-4 md:col-span-3 w-full border border-gray p-1" placeholder="Password" name='password' required type="password"/></>
                <><label className="mt-2 md:mt-0 w-full col-span-4 md:col-span-1" htmlFor="password">Re-Enter Password:</label><input className="mb-2 md:mb-0 col-span-4 md:col-span-3 w-full border border-gray p-1" placeholder="Re-enter Password" name='repeatPassword' required type="password"/></>
                <button className="col-span-4 bg-primary p-2 rounded transition hover:scale-95" type="submit" >Sign Up</button>
            </form>
            <div className="flex justify-center gap-2">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></div>
        </main>
    )
}