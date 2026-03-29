import { useEffect, useState } from "react";
import LoadingErrorBox from "./LoadingErrorBox";

function AddressForm({ selected, onSave, onCancel, loading, error }) {
  const [form, setForm] = useState({ name: "", addr: "", tel: "" });

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name || "",
        addr: selected.addr || "",
        tel: selected.tel || "",
      });
    } else {
      setForm({ name: "", addr: "", tel: "" });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="card">
      <h2>{selected ? "주소록 수정" : "주소록 등록"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input name="name" placeholder="이름" value={form.name} onChange={handleChange} />
          <input name="addr" placeholder="주소" value={form.addr} onChange={handleChange} />
          <input name="tel" placeholder="전화번호" value={form.tel} onChange={handleChange} />
          <button type="submit" disabled={loading}>
            {loading ? "저장 중..." : selected ? "수정" : "등록"}
          </button>
          {selected && (
            <button type="button" onClick={onCancel}>
              취소
            </button>
          )}
        </div>
      </form>
      <LoadingErrorBox loading={loading} error={error} />
    </div>
  );
}

export default AddressForm;
