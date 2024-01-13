import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button";
import { toast } from "react-toastify";
import axios from "axios";
import { saveAdminLogInInfo } from "../../store/actions/auth";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput";
import { CONST } from "../../constaints";
import { appRoutes } from "../../enum/routes";

const AdminLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${CONST.API_URL}/api/admin/login`, {
        email,
        password,
      });

      const { token, admin } = response.data;
      dispatch(saveAdminLogInInfo(token, admin));
      localStorage.setItem("adminToken", token);
      localStorage.setItem("admin", JSON.stringify(admin));

      navigate(appRoutes.ADMIN_EVENTS);
    } catch (e) {
      toast.error("Your email or password is incorrect.");
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/5 mx-auto flex flex-col space-y-5"
      >
        <h1 className="font-bold text-4xl mb-7 font-['Lemon']">
          <span className="text-blue-800">Travel</span>
          <span className="text-blue-500">Vibes</span>
          <span className="text-xs">Admin</span>
        </h1>
        <FormInput
          name="Email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormInput
          name="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button>Sign In</Button>
      </form>
    </main>
  );
};

export default AdminLogIn;
