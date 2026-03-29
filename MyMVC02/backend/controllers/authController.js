const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel"); //여기까지 DB아이디비번 확인
const { createToken } = require("../utils/jwtUtil");

exports.login = async (req, res) => {
  try {
    //엔터, 스페이스도 들어감 값에 *주의
    const userid = req.body.userid ? String(req.body.userid).trim() : "";
    const password = req.body.password ? String(req.body.password).trim() : "";

    if (!userid || !password) {
      return res.status(400).json({ error: "아이디와 비밀번호를 입력하세요." });
    }

    const results = await userModel.findByUserId(userid);

    if (!results || results.length === 0) {
      return res.status(401).json({ error: "존재하지 않는 사용자입니다." });
    }

    const user = results[0];

    let dbHash = user.password.trim();
    if (dbHash.endsWith(".")) {
      dbHash = dbHash.slice(0, -1);
    }
    
    //사용자가 입력한 비밀번호와 저장된 비밀번호가 일치하는 비교
    const isMatch = await bcrypt.compare(password, dbHash);

    if (!isMatch) {
      return res.status(401).json({ error: "비밀번호가 올바르지 않습니다." });
    }

    const token = createToken({
      id: user.id,
      userid: user.userid,
      username: user.username,
    });

    return res.json({
      message: "로그인 성공",
      token,
      user: {
        id: user.id,
        userid: user.userid,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "인증 처리 중 오류" });
  }
};

exports.me = (req, res) => {
  return res.json({
    message: "인증된 사용자 정보",
    user: req.user,
  });
};