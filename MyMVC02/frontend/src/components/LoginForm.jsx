import { useState } from "react";
import { loginUser } from "../services/authApi";
import LoadingErrorBox from "./LoadingErrorBox";

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ userid: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            name="userid"
            placeholder="아이디"
            value={form.userid}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </form>
      <LoadingErrorBox loading={loading} error={error} />
      <p>테스트 계정: admin / 1234</p>
    </div>
  );
}

export default LoginForm;
