import {User} from '../backEnd/Models/user';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <div>
            <main className='loginDiv'>
                <br/><br/>
                {/* Creating a form so we can gather input */}
                <form action="" method="" className='loginForm'>
                    <h1>
                        Log In
                    </h1>
                    <div className="loginElements">
                        <label htmlFor="username">Username: </label>
                        <input className="" id="username" name="username" />
                    </div>
                    <div className="loginElements">
                        <label htmlFor="password">Password: </label>
                        <input className="" id="password" name="password"  type="password" />
                    </div>
                    <div className='account'>Don't have an account?<br/> <br/><Link href="">Sign up!</Link></div>
                    <button className="button" type="submit">Login</button>
                </form>
            </main>
        </div>
    )
}

export default Home;

/* Reference
https://medium.com/@inanbunyamin90/simple-login-page-with-next-js-3f72b417b131
*/