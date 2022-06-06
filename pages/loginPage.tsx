import {User} from '../backEnd/Models/user';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <div>
            {/* Creating a space to put the card */}
            <main className='loginDiv'> 
                <br/><br/>
                {/* Creating a form so we can gather input */}
                <form action="" method="" className='loginForm'>
                    <h1>
                        Log In!
                    </h1>
                    <div className="loginElements">
                        <label htmlFor="username">Username:</label>
                        <input id="username" name="username" />
                    </div>
                    <div className="loginElements">
                        <label htmlFor="password">Password:</label>
                        <input id="password" name="password"  type="password" />
                    </div>
                    <div className='forgotPassword'>Forgot Password?</div>
                    <button className="button" type="submit">Login</button>
                    {/* Will link to the create account page */}
                    <div className='newAccount'>Create an account: &emsp;<Link href="">Sign up!</Link></div>
                </form>
            </main>
        </div>
    )
}
export default Home;

/* Reference
https://medium.com/@inanbunyamin90/simple-login-page-with-next-js-3f72b417b131
*/