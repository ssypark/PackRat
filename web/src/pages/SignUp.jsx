import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Here we define the SignUp component
// this is the main component for the sign up page
function SignUp() {
    // here we use the useState hook to create a state variable for the form data and setter function setFormData
    const [formData, setFormData] = useState({
        // we begin with an empty email and password
        email: "",
        password: "",
        confirmPassword: ""
    });

    // We also need to create a state variable for the error message
    const [error, setError] = useState("");
    // and this is the navigate hook that we will use to redirect the user after successful registration
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => { // this is a function that updates the state whenever the input value changes 
        const { name, value } = e.target; //we destructure the name and value from the event target to get the name of the input field and its value
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

        // We need to validate if passwords match with each other
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match"); // this sets the error message to be displayed
            return;
        }

        // For enhanced security, we need to validate password length (min 8 characters)
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        // Send the request to the server
        // this is the URL of the server and endpoint that we are sending the request to
        fetch("http://localhost:3000/users", {
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
                    if (response.status === 409) { // 409 is the status code for conflict
                        // this means that the email is already in use
                        throw new Error("Email already in use"); // this checks if the email is already in use
                    }
                    throw new Error("Registration failed"); // this checks if the registration failed
                }
                return response.json();
            })
            // If the response is successful, we get the data from the server
            // in this case, the data contains the JWT token and the user ID
            // we then call the handleLogin function passed as a prop to this component
            // this function is responsible for storing the token in local storage and updating the user state
            // we then redirect the user to the sign in page
            .then(data => {
                // Redirect to sign in page after successful registration via the useNavigate hook
                navigate("/sign-in");
            })
            // If there was an error, we catch it and set the error message
            // this is done using the catch method
            .catch(err => {
                setError(err.message);
                console.error("Registration error:", err);
            });
    };

    return (
        <div className="container mx-auto p-8 max-w-md">
            <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-stone-700">Create Account</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
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

                    <div className="mb-4">
                        <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="At least 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <span className="text-sm">Already have an account? </span>
                        <Link to="/sign-in" className="text-stone-600 hover:underline text-sm">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;