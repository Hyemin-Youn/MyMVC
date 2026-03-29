import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import AddressForm from "./components/AddressForm";
import AddressList from "./components/AddressList";
import { getMyInfo } from "./services/authApi";
import {
  createAddress,
  deleteAddress,
  getAddressList,
  updateAddress,
} from "./services/addressApi";

function App() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [errorList, setErrorList] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [errorSave, setErrorSave] = useState("");

  const fetchUser = async () => {
    try {
      const res = await getMyInfo();
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchList = async () => {
    setLoadingList(true);
    setErrorList("");
    try {
      const res = await getAddressList();
      setList(res.data);
    } catch (err) {
      setErrorList(err.response?.data?.error || "주소록 조회 실패");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchUser();
      fetchList();
    }
  }, [isLogin]);

  const handleLogin = (loginUser) => {
    setUser(loginUser);
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLogin(false);
    setList([]);
    setSelected(null);
  };

  const handleSave = async (form) => {
    setLoadingSave(true);
    setErrorSave("");

    try {
      if (selected) {
        await updateAddress(selected.id, form);
      } else {
        await createAddress(form);
      }
      setSelected(null);
      await fetchList();
    } catch (err) {
      setErrorSave(err.response?.data?.error || "저장 실패");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleEdit = (item) => {
    setSelected(item);
    setErrorSave("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    try {
      await deleteAddress(id);
      await fetchList();
    } catch (err) {
      alert(err.response?.data?.error || "삭제 실패");
    }
  };

  return (
    <div className="container">
      <div className="topbar">
        <h1>mymvc02 인증 기반 주소록 프로젝트</h1>
        {isLogin && (
          <div>
            <span style={{ marginRight: "12px" }}>
              {user ? `${user.username}님 로그인` : "로그인됨"}
            </span>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>

      {!isLogin ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <AddressForm
            selected={selected}
            onSave={handleSave}
            onCancel={() => setSelected(null)}
            loading={loadingSave}
            error={errorSave}
          />
          <AddressList
            list={list}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loadingList}
            error={errorList}
          />
        </>
      )}
    </div>
  );
}

export default App;
