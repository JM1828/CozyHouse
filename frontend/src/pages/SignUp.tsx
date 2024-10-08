import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import icons from '../assets/icons';
import useUserStore from '../stores/useUserStore';
import { UserSignUp } from '../types/userType';

interface SignUpFormState extends UserSignUp {
  confirmPassword: string;
}

const SignUp = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const navigate = useNavigate();
  const { signUp } = useUserStore();
  
  const [formState, setFormState] = useState<SignUpFormState>({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    nickname: false,
  });

  const [dFormState] = useDebounce(formState, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    setErrors(prevErrors => ({
      ...prevErrors,
      password: dFormState.password !== dFormState.confirmPassword,
      confirmPassword: dFormState.password !== dFormState.confirmPassword,
    }));
  }, [dFormState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { confirmPassword, ...userData } = formState;
    const newErrors = {
      email: !formState.email,
      password: !formState.password,
      confirmPassword: formState.password !== formState.confirmPassword,
      phone: !formState.phone,
      nickname: !formState.nickname,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      const firstErrorField = Object.keys(newErrors).find(field => newErrors[field as keyof typeof newErrors]);
      if (firstErrorField) {
        (document.getElementsByName(firstErrorField)[0] as HTMLInputElement).focus();
      }
      return;
    }

    try {
      await signUp(userData);
      alert(`WELCOME ${formState.nickname}`);
      navigate("/login");
    } catch (error) {
      console.error('회원가입 실패', error);
      // 에러 처리 (예: 사용자에게 에러 메시지 표시)
    }
  };

  return (
    <div className={`min-h-screen py-6 flex flex-col justify-center sm:py-12 ${darkMode ? 'dark:bg-custom-dark-bg' : 'bg-custom-light-bg'}`}>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 border-4 bg-blue-50 shadow-lg sm:rounded-3xl sm:p-20 dark:bg-gray-700">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center mb-6 hover:cursor-pointer" onClick={() => navigate("/")}>
              <img src={icons.MainHome} className="h-16 w-16 mb-4" alt="CozyHouse Logo"/>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">CozyHouse</h1>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="py-4 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-400 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    autoComplete="off"
                    type="email"
                    className={`peer placeholder-transparent h-10 w-full border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 dark:text-white focus:outline-none focus:border-sky-400 bg-transparent`}
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm transition-all"
                  >
                    이메일
                  </label>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    autoComplete="off"
                    type="password"
                    className={`peer placeholder-transparent h-10 w-full border-b-2 ${errors.password ? 'border-red-500' : formState.password && formState.confirmPassword && formState.password === formState.confirmPassword ? 'border-green-500' : 'border-gray-300'} text-gray-900 dark:text-white focus:outline-none focus:border-sky-400 bg-transparent`}
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm transition-all"
                  >
                    비밀번호
                  </label>
                </div>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    type="password"
                    className={`peer placeholder-transparent h-10 w-full border-b-2 ${errors.confirmPassword ? 'border-red-500' : formState.password && formState.confirmPassword && formState.password === formState.confirmPassword ? 'border-green-500' : 'border-gray-300'} text-gray-900 dark:text-white focus:outline-none  focus:border-sky-400 bg-transparent`}
                    placeholder="Confirm Password"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm transition-all"
                  >
                    비밀번호 확인
                  </label>
                </div>
                <div className="relative">
                  <div className='flex'>
                    <input
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      autoComplete="off"
                      type="text"
                      className={`peer placeholder-transparent h-10 w-full border-b-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 dark:text-white focus:outline-none focus:border-sky-400 bg-transparent`}
                      placeholder="Phone"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm transition-all"
                    >
                      휴대폰
                    </label>
                    <div className='text-nowrap'>
                      <button type="button" className="text-sm ml-4 border-2 text-sky-500 dark:text-white border-gray-300 rounded-md px-4 py-2 h-11">
                        인증
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input
                    name="nickname"
                    value={formState.nickname}
                    onChange={handleChange}
                    autoComplete="off"
                    type="text"
                    className={`peer placeholder-transparent h-10 w-full border-b-2 ${errors.nickname ? 'border-red-500' : 'border-gray-300'} text-gray-900 dark:text-white focus:outline-none focus:border-sky-400 bg-transparent`}
                    placeholder="Nickname"
                  />
                  <label
                    htmlFor="nickname"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm transition-all"
                  >
                    닉네임
                  </label>
                </div>
                <div className="relative justify-center items-center flex">
                  <button type="submit" className="w-full bg-sky-500 text-white rounded-md px-2 py-1">회원가입</button>
                </div>
              </form>
              <div className="items-center justify-center flex gap-2 text-gray-900 dark:text-slate-300">
                <span>이미 아이디가 있으신가요?</span>
                <span className='border-b border-gray-400 dark:border-gray-300'><Link to="/login">로그인</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
