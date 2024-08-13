
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const navigate = useNavigate();



  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState<any>({});

  const validateStep1 = () => {
    const newErrors: any = {};
    if (!userDetails.username) newErrors.username = 'Username is required';
    if (!userDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!userDetails.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};
    if (!userDetails.firstName) newErrors.firstName = 'First name is required';
    if (!userDetails.lastName) newErrors.lastName = 'Last name is required';
    if (!userDetails.address) newErrors.address = 'Address is required';
    if (!userDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(userDetails.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2 && validateStep2()) {
      try {
        const res = await axios.post('https://fakestoreapi.com/users', userDetails);
        console.log(' successfully sigend up', userDetails);
        console.log("response : ", res);
        const userId = res.data.id;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        navigate('/login');

      } catch (error) {
        setErrors("Something went wrong during sign-up process");
        console.log("error : ", error);
      } finally {

      }
      // Here you would typically send the form data to your API
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userDetails.username}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.address && <p className="text-red-500">{errors.address}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
