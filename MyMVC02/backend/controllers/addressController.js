const addressModel = require("../models/addressModel");

exports.getList = async (req, res) => {
  try {
    const results = await addressModel.getAll();
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ error: "주소록 조회 실패" });
  }
};

exports.insert = async (req, res) => {
  try {
    const { name, addr, tel } = req.body;

    if (!name || !addr || !tel) {
      return res.status(400).json({ error: "이름, 주소, 전화번호를 모두 입력하세요." });
    }

    const result = await addressModel.insert({ name, addr, tel });

    return res.status(201).json({
      message: "주소록 등록 성공",
      insertedId: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({ error: "주소록 등록 실패" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, addr, tel } = req.body;

    const result = await addressModel.update(id, { name, addr, tel });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "수정할 데이터가 없습니다." });
    }

    return res.json({ message: "주소록 수정 성공" });
  } catch (err) {
    return res.status(500).json({ error: "주소록 수정 실패" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await addressModel.remove(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "삭제할 데이터가 없습니다." });
    }

    return res.json({ message: "주소록 삭제 성공" });
  } catch (err) {
    return res.status(500).json({ error: "주소록 삭제 실패" });
  }
};