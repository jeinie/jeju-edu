const database = require('../../firebase/config');

module.exports = {
  submit: async(req, res) => {
    try {
      const { phone, email } = req.body;
      // phone, email 값 undefined 체크할 것

      await database.ref('users').child(phone).set({
        email: email,
      }); 
      res.status(200).json({
        code: 200,
        message: `파이어베이스에 데이터 성공적으로 저장`,
      });
    } catch (e) {
      return res.status(500).json({
        code: 500,
        message: `서버 내 알 수 없는 에러발생 ${e}`,
      })
    }
  }
}