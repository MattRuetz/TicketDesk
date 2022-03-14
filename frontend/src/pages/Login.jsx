import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { email, password } = formData;

    // Initialize dispatch for redux
    const dispatch = useDispatch();

    // import state info needed
    const { user, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };
        dispatch(login(userData));
    };

    return (
        <div>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Pleae login to get support</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            name="email"
                            onChange={onChange}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            name="password"
                            onChange={onChange}
                            placeholder="Password"
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">Log In</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;
