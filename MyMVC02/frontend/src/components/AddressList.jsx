function AddressList({ list, onEdit, onDelete, loading, error }) {
  if (loading) {
    return <div className="loading">목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="card">
      <h2>주소록 목록</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="5">데이터가 없습니다.</td>
            </tr>
          ) : (
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.addr}</td>
                <td>{item.tel}</td>
                <td>
                  <div className="row">
                    <button type="button" onClick={() => onEdit(item)}>수정</button>
                    <button type="button" onClick={() => onDelete(item.id)}>삭제</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AddressList;
