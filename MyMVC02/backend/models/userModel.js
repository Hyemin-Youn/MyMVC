const conn = require("../config/db");

exports.findByUserId = async (userid) => {
  const sql = "SELECT id, userid, password, username FROM users WHERE userid = ?";
  const [rows] = await conn.query(sql, [userid]);
  return rows;
};