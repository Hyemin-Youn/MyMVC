//통행증 -> 라우터에 접근 전 JWT토큰을 검증하는 미들웨어
const { verifyTokenAsync } = require("../utils/jwtUtil");

exports.requireAuth = async (req, res, next) => {
  try {
    //1. HTTP 요청 헤더에서 authorization항목을 리턴한다.
    const authHeader = req.headers.authorization;

    //2. 헤더에 없거나 Bearer로 시작하지 않으면 인증 실패 리턴한다.
    // "Bearer 토큰값"으로 시작된다 = 표준문서명시되어 있음.
    if (!authHeader || !authHeader.startsWith("Bearer ")) { //Bearer 뒤에 space 한칸주기
      return res.status(401).json({ error: "토큰이 없습니다." });
    }

    //3.Bearer 뒷부분의 실제 토큰 문자열만 추출한다.
    const token = authHeader.split(" ")[1];

    //4. 추출한 토큰이 유효한지 (위조방지, 만료시간 등)을 비동기로 검증
    const decoded = await verifyTokenAsync(token);

    //5. 검증결과를 리턴, 인증함.
    req.user = decoded;
    next(); // 다음 로직인 controller로 넘어간다.

  } catch (err) {
    return res.status(401).json({ error: "유효하지 않거나 만료된 토큰입니다." });
  }
};