function LoadingErrorBox({ loading, error }) {
  return (
    <>
      {loading && <div className="loading">처리 중입니다...</div>}
      {error && <div className="error">{error}</div>}
    </>
  );
}

export default LoadingErrorBox;
