import { useState } from "react";
import EmpForm from "./components/EmpForm";
import EmpListSearch from "./components/EmpListSearch.jsx";

function App() {
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  //리스트를 새로고침 하는 함수
  const refreshList = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>My_EMP's EmpEntity CRUD 프로젝트</h1>
      <EmpForm 
        selectedEmp={selectedEmp}
        setSelectedEmp={setSelectedEmp}
        refreshList={refreshList}
      />
      <hr />
      <EmpListSearch 
        setSelectedEmp={setSelectedEmp}
        reloadKey={reloadKey} //이 값이 변경되면 목록을 재호출 리턴
        refreshList={refreshList}//리스트 갱신용
      />
    </div>
  );
}

export default App;