"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function RegisterPage() {
  const router = useRouter()
  const [user, setUser] = useState({name: "", email: "", password: "", tel: ""})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Form submitted", user)
    try {
        const response = await userRegister(user.name, user.email, user.tel, user.password);
        if (response.success) {
          router.push("/login");
        } else {
          setError("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred during registration. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-center text-2xl font-semibold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
       <div className="mb-4">
        <input
         type="name"
         placeholder="name"
         value={user.name}
         onChange={(e)=> setUser({...user, name: e.target.value})}
         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="mb-4">
        <input
          type="tel"
          placeholder="Phone Number"
          value={user.tel}
          onChange={(e) => setUser({ ...user, tel: e.target.value })}
          required
           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
        <div className="mb-4">
         <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
        <button type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >  {loading ? "Registering..." : "Sign Up"}</button>
      </form>
    </div>
  );
}
