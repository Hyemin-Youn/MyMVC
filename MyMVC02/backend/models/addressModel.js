const conn = require("../config/db");

exports.getAll = async () => {
  const sql = "SELECT id, name, addr, tel FROM address ORDER BY id DESC";
  const [rows] = await conn.query(sql);
  return rows;
};

exports.insert = async (data) => {
  const sql = "INSERT INTO address (name, addr, tel) VALUES (?, ?, ?)";
  const [result] = await conn.query(sql, [data.name, data.addr, data.tel]);
  return result;
};

exports.update = async (id, data) => {
  const sql = "UPDATE address SET name = ?, addr = ?, tel = ? WHERE id = ?";
  const [result] = await conn.query(sql, [data.name, data.addr, data.tel, id]);
  return result;
};

exports.remove = async (id) => {
  const sql = "DELETE FROM address WHERE id = ?";
  const [result] = await conn.query(sql, [id]);
  return result;
};