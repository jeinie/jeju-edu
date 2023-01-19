const database = require('../../firebase/config');

module.exports = {
  count: async(req, res) => {
    const dbRef = await database.ref();
    dbRef.child('users').get().then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(`db=${Object.keys(snapshot.val())}`);
        const countParticipants = Object.keys(snapshot.val()).length;

        res.status(200).json({
          code: 200,
          message: `현재 참여자 수 가져오기 성공`,
          countParticipants: countParticipants,
        });
      } else {
          console.log("No data available");
          res.status(202).json({
            code: 202,
            message: `사용 가능한 데이터가 없음`,
          });
      }
    }).catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: `${error}`,
      })
    });
  },
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
  },
}