import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ballpit from "../components/Ballpit";

function SignIn({ handleLogin }) {
    // this navigate hook is used to redirect after login
    const navigate = useNavigate();

    // here we define the state for the form data
    // this is the data that we will send to the server. email and password
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Error handling state here is used to display error messages to the user if the login fails
    const [error, setError] = useState("");

    // Handle form input changes
    // this updates the state whenever the input value changes
    const handleChange = (e) => {
        const { name, value } = e.target; // destructure the name and value from the event target
        // the name attribute of the input field is used to identify which field is being updated
        // the value is the new value of the input field
        // update the formData state with the new value
        // we then update the state with the setFormData function
        setFormData({ // setFormData is a function that updates the state returned by the useState hook
            // calling it should trigger a re-render of the component
            // the spread operator takes all the existing properties of formData and copies them into a new object
            // this is necessary to keep the other properties of the formData object intact when updating it
            // without this, we would lose the other properties of the formData object
            ...formData,
            // the square brackets are used to dynamically set the property name
            // we use the name variable to set the property name dynamically
            // in this case, name is either "email" or "password" depending on which input field is being updated
            // this makes the function reusable for both input fields
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setError(""); // this clears any previous error messages

        // Send the request to the server
        // this is the URL of the server and endpoint that we are sending the request to
        fetch("http://localhost:3000/users/sign-in", {
            method: "POST", // we send a POST request to the server
            // this is the headers that we are sending with the request
            headers: {
                "Content-Type": "application/json" // this tells the server that we are sending JSON data
            },
            // this is the body of the request
            // we are sending the formData object as JSON. In this case, it contains the email and password
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        }) // Then, we process the initial response from the server to check if it was successful
            .then(response => {
                if (!response.ok) {
                    throw new Error("Sign in failed");
                }
                return response.json();
            })
            // If the response is successful, we get the data from the server
            // in this case, the data contains the JWT token and the user ID
            // we then call the handleLogin function passed as a prop to this component
            // this function is responsible for storing the token in local storage and updating the user state
            // we also redirect the user to the home page after successful login
            .then(data => {
                console.log("Log in response:", data);
                // Call the login handler with the token and email
                handleLogin(data.jwt, formData.email);
                // Redirect to home page
                navigate("/");
            })
            .catch(err => {
                setError("Invalid email or password. Please try again.");
                console.error("Login error:", err);
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Ballpit background directly in component */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Ballpit
                    count={100}
                    gravity={0.5}
                    friction={0.9975}
                    wallBounce={0.95}
                    followCursor={true}
                    colors={['#805AD5', '#4FD1C5', '#F6AD55']}
                />
            </div>

          

            {/* Form content */}
            <div className="container mx-auto p-8 max-w-md z-20 mt-[-300px]">
                <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
                    <h2 className="text-2xl font-bold mb-6 text-center text-stone-700">Sign In</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Your existing form fields... */}

                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <span className="text-sm">Don't have an account? </span>
                            <Link to="/sign-up" className="text-stone-600 hover:underline text-sm">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;