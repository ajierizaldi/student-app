import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';


import styles from '../../../styles/Login.module.css';
import { postRequest, getRequest } from '../../../api/apiConfig'
import LoadingAnimation from '../../../components/LoadingAnimation';

const Login = () => {

    const dispatch = useDispatch();

    const [onLoading, setOnLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email tidak valid')
                .required('Email tidak boleh kosong'),
            password: Yup.string()
                .required('Password tidak boleh kosong')
        }),
        onSubmit: values => {
            setMsg('');
            onLogin(values);
            setOnLoading(true);
        }
    });


    const onLogin = async (values) => {
        try {
            const user = await postRequest('auth/login', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem('token', `Bearer ${user.data.token}`)
            dispatch({
                id: user.data.id,
                fullname: user.data.fullname,
                username: user.data.username,
                email: user.data.email,
                password: user.data.password,
            });
            const dataUser = user.data.data
            const isComplete = Object.values(dataUser).includes(null) ? false : true;

            isComplete ? window.location.href = '/' : window.location.href = '/dashboard';
        } catch (error) {
            setMsg(error.response?.data?.message);
            setOnLoading(false);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <main className={styles.flexContainer}>
                    <div className={styles.flexLeft}>
                        <div>
                            Student<br></br> App.
                        </div>
                    </div>
                    <div className={styles.flexRight}>
                        <div className={styles.card}>
                            {msg ?
                                <div className="text-center alert alert-danger" role="alert">
                                    <strong>{msg}</strong>
                                </div>
                                : null}
                            <p className={styles.head}>Masuk</p>
                            <div className={styles.input}>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-2">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Contoh: johndee@gmail.com"
                                            name="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-danger">{formik.errors.email}</div>
                                        ) : null}

                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Masukkan Password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-danger">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <p className={styles.forget}>
                                        <a href="forget-password">Lupa password?</a>
                                    </p>
                                    {onLoading ? <LoadingAnimation /> :
                                        <button type="submit" className={styles.button}>
                                            Masuk
                                        </button>
                                    }
                                </form>
                            </div>
                            <div className={styles.line2}>
                                {/* <hr></hr> */}
                            </div>
                            <p className={styles.footer}>
                                Belum punya akun? <a href="register">Daftar disini</a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>

        </>
    )
}

export default Login;