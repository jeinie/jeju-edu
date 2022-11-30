const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "JenFra API",
      version: "1.0.0",
      description: "Janfra API with express",
    },
    host: "localhost:443",
    basePath: "/",
    tags: [
      {
        name: "Test Swagger",
        description: "API for task",
      },
    ],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
      "/api/auth/login": {
        post: {
          tags: ["Login"],
          summary: "Login Data Post",
          parameters: [
            {
              in: "body",
              name: "body",
              description: "로그인할때 보내는 form형식",
              schema: {
                $ref: "#/definitions/apiAuthLoginRequestForm",
              },
            },
          ],
          responses: {
            200: {
              description: "Login Success(로그인 성공)",
              schema: {
                $ref: "#/definitions/apiAuthLoginResponseForm",
              },
            },
            403: {
              description: "Failed to Search User(일치하는 유저가 없다)",
            },
            500: {
              description:
                "Failed to create jwt token(jwt토큰만드는 로직에 문제가 생겼다)",
            },
          },
        },
      },

      "/api/auth/join": {
        post: {
          tags: ["Join"],
          summary: "Join Data Post",
          parameters: [
            {
              in: "body",
              name: "body",
              description: "회원가입할때 보내는 form형식",
              schema: {
                $ref: "#/definitions/apiAuthJoinRequestForm",
              },
            },
          ],
          responses: {
            200: {
              description: "Login Success(회원가입 성공)",
              schema: {
                $ref: "#/definitions/apiAuthJoinResponseForm",
              },
            },
            100: {
              description: "아이디 중복일시 (실패)",
              schema: {
                $ref: "#/definitions/apiAuthJoinResponseForm",
              },
            },
          },
        },
      },

      "/api/auth/payload": {
        get: {
          tags: ["PayLoad"],
          summary: "PayLoad Verify JWT Token",
          parameters: [
            {
              in: "",
              name: "",
              description:
                "쿠키내에 JWT토큰이 아직 유효한지를 검사하는 API (그냥 get쏘면됨 파라미터 X)",
            },
          ],
          responses: {
            200: {
              description: "쿠키내의 JWT 토큰이 유효함",
              schema: {
                $ref: "#/definitions/apiAuthPayLoadResponseForm_VerifySuccess",
              },
            },
            401: {
              description:
                "로그인하지않고 그냥 /api/auth/payload로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함",
              schema: {
                $ref: "#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401",
              },
            },
            419: {
              description:
                "쿠키내의 JWT 토큰이 accessToken , refreshToken 모두 유효기간이 다함 -> 즉 다시 로그인해야하니 로그인페이지로 보내야함",
              schema: {
                $ref: "#/definitions/apiAuthPayLoadResponseForm_VerifyFailed419",
              },
            },
          },
        },
      },
      "/api/auth/logout": {
        get: {
          tags: ["Logout"],
          summary: "Logout API (그냥 로그아웃)",
          parameters: [
            {
              in: "",
              name: "",
              description:
                "파라미터 아무것도 안보내고 그냥 쏘면 쿠키내에 accessToken이 삭제된다",
            },
          ],
          responses: {
            200: {
              description: "성공적으로 로그아웃이 되었습니다",
              schema: {
                $ref: "#/definitions/apiAuthLogoutResponseForm_Success",
              },
            },
            500: {
              description:
                "로그아웃을 하는중에 무언가 에러가 발생해 예외처리되었다",
              schema: {
                $ref: "#/definitions/apiAuthLogoutResponseForm_Failed",
              },
            },
          },
        },
      },

      "/api/getStudyList/code": {
        get: {
          tags: ["프로그래밍 스터디 모임 리스트 추출"],
          summary:
            "프로그래밍 주제 관련한 스터디 모임의 리스트를 서버로부터 받는다",
          parameters: [
            {
              in: "",
              name: "",
              description:
                "파라미터 아무것도 안보내고 그냥 보내면 프로그래밍 주제 관련한 스터디 모임의 리스트를 서버로부터 받을수가 있다",
            },
          ],
          responses: {
            200: {
              description:
                "성공적으로 프로그래밍 주제 관련한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음",
              schema: {
                $ref: "#/definitions/apiGetStudyListCode_ResponseForm_Success",
              },
            },
            401: {
              description:
                "로그인하지않고 그냥 /api/getStudyList/code로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함",
              schema: {
                $ref: "#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401",
              },
            },
            500: {
              description:
                "프로그래밍 관련 스터디 추출에 관한 서버에서의 에러발생",
              schema: {
                $ref: "#/definitions/apiGetStudyListCode_ResponseForm_Failed",
              },
            },
          },
        },
      },

      "/api/getStudyList/sing": {
        get: {
          tags: ["보컬댄스 스터디 모임 리스트 추출"],
          summary:
            "보컬댄스 주제 관련한 스터디 모임의 리스트를 서버로부터 받는다",
          parameters: [
            {
              in: "",
              name: "",
              description:
                "파라미터 아무것도 안보내고 그냥 보내면 보컬댄스 주제 관련한 스터디 모임의 리스트를 서버로부터 받을수가 있다",
            },
          ],
          responses: {
            200: {
              description:
                "성공적으로 보컬댄스 주제 관련한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음",
              schema: {
                $ref: "#/definitions/apiGetStudyListSing_ResponseForm_Success",
              },
            },
            401: {
              description:
                "로그인하지않고 그냥 /api/getStudyList/sing로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함",
              schema: {
                $ref: "#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401",
              },
            },
            500: {
              description:
                "보컬댄스 관련 스터디 추출에 관한 서버에서의 에러발생",
              schema: {
                $ref: "#/definitions/apiGetStudyListSing_ResponseForm_Failed",
              },
            },
          },
        },
      },

      "/api/getStudyList/design": {
        get: {
          tags: ["디자인 스터디 모임 리스트 추출"],
          summary:
            "디자인 주제 관련한 스터디 모임의 리스트를 서버로부터 받는다",
          parameters: [
            {
              in: "",
              name: "",
              description:
                "파라미터 아무것도 안보내고 그냥 보내면 디자인 주제 관련한 스터디 모임의 리스트를 서버로부터 받을수가 있다",
            },
          ],
          responses: {
            200: {
              description:
                "성공적으로 디자인 주제 관련한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음",
              schema: {
                $ref: "#/definitions/apiGetStudyListDesign_ResponseForm_Success",
              },
            },
            401: {
              description:
                "로그인하지않고 그냥 /api/getStudyList/design로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함",
              schema: {
                $ref: "#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401",
              },
            },
            500: {
              description: "디자인 관련 스터디 추출에 관한 서버에서의 에러발생",
              schema: {
                $ref: "#/definitions/apiGetStudyListDesign_ResponseForm_Failed",
              },
            },
          },
        },
      },

      "/api/openStudy": {
        post: {
          tags: ["스터디 모임 개설"],
          summary: "스터디 모임을 일정 양식에 따라 개설한다",
          parameters: [
            {
              in: "body",
              name: "body",
              description:
                "body내에 스터디 개설에 필요한 데이터들을 집어넣고 서버로 Http Request를 보내야 한다",
              schema: {
                $ref: "#/definitions/apiOpenStudyRequestForm",
              },
            },
          ],
          responses: {
            200: {
              description: "성공적으로 스터디 개설 성공",
              schema: {
                $ref: "#/definitions/apiOpenStudy_ResponseForm_Success",
              },
            },
            401: {
              description:
                "로그인하지않고 그냥 /api/openStudy로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함",
              schema: {
                $ref: "#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401",
              },
            },
            500: {
              description: "스터디 개설 관련 서버내의 에러 발생",
              schema: {
                $ref: "#/definitions/apiOpenStudy_ResponseForm_Failed",
              },
            },
          },
        },
      },
    },
    definitions: {
      DBuserTable: {
        properties: {
          user_no: {
            type: "integer",
          },
          id: {
            type: "string",
          },
          password: {
            type: "string",
          },
          name: {
            type: "string",
          },
          good_cnt: {
            type: "integer",
          },
          bad_cnt: {
            type: "integer",
          },
          createdAt: {
            type: "date",
          },
          deletedAt: {
            type: "date",
          },
          updatedAt: {
            type: "date",
          },
        },
      },
      DBstudyTable: {
        properties: {
          study_no: {
            type: "integer",
          },
          who_open: {
            type: "string",
          },
          study_title: {
            type: "string",
          },
          study_category: {
            type: "string",
          },
          study_detail_description: {
            type: "string",
          },
          min_member_cnt: {
            type: "integer",
          },
          studyAt_date: {
            type: "date",
          },
          studyAt_location: {
            type: "string",
          },
          tmX: {
            type: "float",
          },
          tmY: {
            type: "float",
          },
          deadline: {
            type: "date",
          },
          status: {
            type: "integer",
          },
        },
      },
      DBAllStudyListTable: {
        properties: {
          StudyStudyNo: {
            type: "integer",
          },
          UserUserNo: {
            type: "integer",
          },
          createdAt: {
            type: "date",
          },
          updatedAt: {
            type: "date",
          },
        },
      },
      apiAuthLoginRequestForm: {
        properties: {
          id: {
            type: "string",
          },
          pw: {
            type: "string",
          },
        },
      },
      apiAuthLoginResponseForm: {
        properties: {
          code: {
            type: "integer",
          },
          message: {
            type: "string",
          },
          id: {
            type: "string",
          },
          userInfo: {
            type: "object",
            properties: {
              user_no: {
                type: "integer",
              },
              id: {
                type: "string",
              },
              nick: {
                type: "string",
              },
              name: {
                type: "string",
              },
              good_cnt: {
                type: "integer",
              },
              bad_cnt: {
                type: "integer",
              },
              StudyStudyNo: {
                type: "integer",
              },
            },
          },
        },
      },

      apiAuthLogoutResponseForm_Success: {
        properties: {
          code: {
            type: "integer",
            description: "로그아웃이 성공하면 코드 200이 리턴된다",
          },
          message: {
            type: "string",
          },
        },
      },

      apiAuthLogoutResponseForm_Failed: {
        properties: {
          code: {
            type: "integer",
            description:
              "로그아웃이 예상치못한 이유로 실패하면 코드 500이 리턴된다",
          },
          message: {
            type: "string",
          },
        },
      },

      apiAuthJoinRequestForm: {
        properties: {
          id: {
            type: "string",
          },
          pw: {
            type: "string",
          },
          name: {
            type: "string",
            description: "고객의 실명이 기입된다",
          },
          nick: {
            type: "string",
            description: "고객이 웹/앱상에서 사용할 닉네임이 입력된다",
          },
        },
      },
      apiAuthJoinResponseForm: {
        properties: {
          success: {
            type: "integer",
            description: "회원가입 성공시에 success에 200이 리턴된다",
          },
          message: {
            type: "string",
          },
        },
      },
      apiAuthPayLoadResponseForm_VerifySuccess: {
        properties: {
          code: {
            type: "integer",
            description: "토큰이 아직 유효할시에 code는 200이 전달된다",
          },
          message: {
            type: "string",
            description:
              "토큰이 아직 유효할시에 '토큰이 정상입니다'메세지가 리턴된다",
          },
          data: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description:
                  "로그인할때 적는 유저의 id가 리턴된다 ex)monster , admin",
              },
              profile: {
                type: "object",
                properties: {
                  user_no: {
                    type: "integer",
                    description:
                      "db에 기록된 해당유저의 user_no 즉 그저 가입한 순서대로 기록되는 index가 리턴된다",
                  },
                  id: {
                    type: "string",
                    description:
                      "로그인할때 적는 유저의 id가 리턴된다 ex)monster , admin",
                  },
                  nick: {
                    type: "string",
                    description:
                      "해당 유저가 가입할때 적는 nick 이다 , 실제 로그인할때 쓰는 id가 아닌 그냥 웹/앱상에서 사용하는 닉네임이다",
                  },
                  name: {
                    type: "string",
                    description: "해당유저가 가입할때 적는 유저의 실명이다",
                  },
                  good_cnt: {
                    type: "integer",
                    description:
                      "해당 유저가 받아온 한라봉 등 스터디에 잘 참여했을때 받는 리워드의 누적 갯수이다",
                  },
                  bad_cnt: {
                    type: "integer",
                    description:
                      "해당 유저가 받아온 썩은 과일들 즉 스터디에 잘 참여하지 않았을때 받는 리워드의 누적 갯수이다",
                  },
                  StudyStudyNo: {
                    type: "integer",
                    description:
                      "sequelize때문에 만들어진 컬럼인데 , 추후 수정해야할듯한데.. 일단은 이게 있다고 front단에 문제는 없을듯하다",
                  },
                },
              },
            },
          },
        },
      },

      apiAuthPayLoadResponseForm_VerifyFailed401: {
        properties: {
          code: {
            type: "integer",
            description:
              "토큰이 만료되었을시엔 419 코드가 리턴이 된다 고로 401이 리턴이되면 새로 로그인해야함으로 로그인페이지로 강제이동 시켜야한다",
          },
          message: {
            type: "string",
            description: "유효하지 않은 토큰입니다",
          },
        },
      },

      apiAuthPayLoadResponseForm_VerifyFailed419: {
        properties: {
          code: {
            type: "integer",
            description:
              "토큰이 만료되었을시엔 419 코드가 리턴이 된다 고로 419가 리턴이되면 새로 로그인해야함으로 로그인페이지로 강제이동 시켜야한다",
          },
          message: {
            type: "string",
            description: "토큰이 만료되었습니다 메세지가 리턴된다",
          },
        },
      },

      apiGetStudyListCode_ResponseForm_Success: {
        properties: {
          code: {
            type: "integer",
            description: "성공하면 코드 200이 리턴된다",
          },
          message: {
            type: "string",
            description:
              "성공하면 프로그래밍 관련 스터디 추출 성공 이라는 메세지가 리턴된다",
          },
          studyList: {
            type: "object",
            properties: {
              study_no: {
                type: "integer",
                description: "primary Key auto_increment 그저 index표시용 컬럼",
              },
              who_open: {
                type: "string",
                description:
                  "누가 이 스터디를 개설했는지를 알수있는 컬럼 해당 유저의 nick 즉 닉네임이 들어간다",
              },
              study_title: {
                type: "string",
                description: "이 스터디의 제목이다. ex)Java 단체 스터디 모집",
              },
              study_category: {
                type: "string",
                description:
                  "ex) 프로그래밍 , 보컬댄스 , 디자인 즉 그저 카테고리",
              },
              study_detail_description: {
                type: "string",
                description:
                  "ex) 나랑같이 Java스터디하실분~ 8명모이면 바로시작~ 즉 그냥 스터디에 관한 설명",
              },
              min_member_cnt: {
                type: "integer",
                description:
                  "스터디가 시작하기위한 최소인원 설정, 현석이형이 db에 더미데이터를 집어넣을때 4의 배수로 설정해달라고 했었다",
              },
              studyAt_date: {
                type: "date",
                description:
                  "말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간",
              },
              studyAt_location: {
                type: "string",
                description:
                  "스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다",
              },
              tmX: {
                type: "float",
                description: "스터디가 이루어지는 장소의 위도 경도",
              },
              tmY: {
                type: "float",
                description: "스터디가 이루어지는 장소의 위도 경도",
              },
              deadline: {
                type: "date",
                description:
                  "해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다",
              },
              status: {
                type: "integer",
                description:
                  "해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...",
              },
              createdAt: {
                type: "date",
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: "date",
                description:
                  "혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼",
              },
              deletedAt: {
                type: "date",
                description: "스터디가 언제 삭제되었는지 기록되는 컬럼",
              },
              UserUserNo: {
                type: "date",
                description:
                  "해당 스터디를 누가 열었는지 그 유저의 user_no가 기록되는 컬럼",
              },
            },
          },
        },
      },
      apiGetStudyListCode_ResponseForm_Failed: {
        properties: {
          code: {
            type: "integer",
          },
          message: {
            type: "string",
          },
        },
      },

      apiGetStudyListSing_ResponseForm_Success: {
        properties: {
          code: {
            type: "integer",
            description: "성공하면 코드 200이 리턴된다",
          },
          message: {
            type: "string",
            description:
              "성공하면 보컬댄스 관련 스터디 추출 성공 이라는 메세지가 리턴된다",
          },
          studyList: {
            type: "object",
            properties: {
              study_no: {
                type: "integer",
                description: "primary Key auto_increment 그저 index표시용 컬럼",
              },
              who_open: {
                type: "string",
                description:
                  "누가 이 스터디를 개설했는지를 알수있는 컬럼 해당 유저의 nick 즉 닉네임이 들어간다",
              },
              study_title: {
                type: "string",
                description: "이 스터디의 제목이다. ex)Java 단체 스터디 모집",
              },
              study_category: {
                type: "string",
                description:
                  "ex) 프로그래밍 , 보컬댄스 , 디자인 즉 그저 카테고리",
              },
              study_detail_description: {
                type: "string",
                description:
                  "ex) 나랑같이 Java스터디하실분~ 8명모이면 바로시작~ 즉 그냥 스터디에 관한 설명",
              },
              min_member_cnt: {
                type: "integer",
                description:
                  "스터디가 시작하기위한 최소인원 설정, 현석이형이 db에 더미데이터를 집어넣을때 4의 배수로 설정해달라고 했었다",
              },
              studyAt_date: {
                type: "date",
                description:
                  "말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간",
              },
              studyAt_location: {
                type: "string",
                description:
                  "스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다",
              },
              tmX: {
                type: "float",
                description: "스터디가 이루어지는 장소의 위도 경도",
              },
              tmY: {
                type: "float",
                description: "스터디가 이루어지는 장소의 위도 경도",
              },
              deadline: {
                type: "date",
                description:
                  "해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다",
              },
              status: {
                type: "integer",
                description:
                  "해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...",
              },
              createdAt: {
                type: "date",
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: "date",
                description:
                  "혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼",
              },
              deletedAt: {
                type: "date",
                description: "스터디가 언제 삭제되었는지 기록되는 컬럼",
              },
              UserUserNo: {
                type: "date",
                description:
                  "해당 스터디를 누가 열었는지 그 유저의 user_no가 기록되는 컬럼",
              },
            },
          },
        },
      },
      apiGetStudyListSing_ResponseForm_Failed: {
        properties: {
          code: {
            type: "integer",
          },
          message: {
            type: "string",
          },
        },
      },

      apiGetStudyListDesign_ResponseForm_Success: {
        properties: {
          code: {
            type: "integer",
            description: "성공하면 코드 200이 리턴된다",
          },
          message: {
            type: "string",
            description:
              "성공하면 디자인 관련 스터디 추출 성공 이라는 메세지가 리턴된다",
          },
          studyList: {
            type: "object",
            properties: {
              study_no: {
                type: "integer",
                description: "primary Key auto_increment 그저 index표시용 컬럼",
              },
              who_open: {
                type: "string",
                description:
                  "누가 이 스터디를 개설했는지를 알수있는 컬럼 해당 유저의 nick 즉 닉네임이 들어간다",
              },
              study_title: {
                type: "string",
                description: "이 스터디의 제목이다. ex)Java 단체 스터디 모집",
              },
              study_category: {
                type: "string",
                description:
                  "ex) 프로그래밍 , 보컬댄스 , 디자인 즉 그저 카테고리",
              },
              study_detail_description: {
                type: "string",
                description:
                  "ex) 나랑같이 Java스터디하실분~ 8명모이면 바로시작~ 즉 그냥 스터디에 관한 설명",
              },
              min_member_cnt: {
                type: "integer",
                description:
                  "스터디가 시작하기위한 최소인원 설정, 현석이형이 db에 더미데이터를 집어넣을때 4의 배수로 설정해달라고 했었다",
              },
              studyAt_date: {
                type: "date",
                description:
                  "말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간",
              },
              studyAt_location: {
                type: "string",
                description:
                  "스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다",
              },
              tmX: {
                type: "float",
                description: "스터디가 이루어지는 장소의 위도 경도",
              },
              tmY: {
                type: "float",
                description: "스터디가 이루어지는 장소의 위도 경도",
              },
              deadline: {
                type: "date",
                description:
                  "해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다",
              },
              status: {
                type: "integer",
                description:
                  "해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...",
              },
              createdAt: {
                type: "date",
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: "date",
                description:
                  "혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼",
              },
              deletedAt: {
                type: "date",
                description: "스터디가 언제 삭제되었는지 기록되는 컬럼",
              },
              UserUserNo: {
                type: "date",
                description:
                  "해당 스터디를 누가 열었는지 그 유저의 user_no가 기록되는 컬럼",
              },
            },
          },
        },
      },

      apiGetStudyListDesign_ResponseForm_Failed: {
        properties: {
          code: {
            type: "integer",
          },
          message: {
            type: "string",
          },
        },
      },

      apiOpenStudyRequestForm: {
        properties: {
          who_open: {
            type: "string",
            description:
              "스터디를 개설한 사람이 누구인지 그 사람의 nick 을 기록한다 , 절대 로그인할때의 id가 아니라 웹/앱 상에서 사용하는 nickname이다",
          },
          study_title: {
            type: "string",
            description:
              "스터디를 개설할때에 해당 스터디의 제목을 적는다 ex) 힙합댄스 스터디 모집합니다~ 12명이상되면 바로 시작해요~",
          },
          study_category: {
            type: "string",
            description:
              "스터디 개설시에 어떤 스터디인지 카테고리를 기록한다 ex) 보컬댄스 , 프로그래밍 , 디자인",
          },
          study_detail_description: {
            type: "string",
            description:
              "스터디 모집글에 대한 상세설명이다. ex) 20살 이하만 신청가능해요! , 18:00~19:00까지 진행합니다~",
          },
          min_member_cnt: {
            type: "string",
            description: "스터디가 시작되기 위한 최소인원수",
          },
          studyAt_date: {
            type: "date",
            description:
              "스터디가 이루어지는 실제 날짜이다 , 절대 스터디를 개설한 날짜가 아닌 , 개설시에 언제 스터디를 진행할지 기록한 그 날짜이다",
          },
          studyAt_location: {
            type: "string",
            description:
              "스터디가 이루어지는 지역구이다 . ex) 제주특별시 서귀포구 성산읍 플레이 스테이션",
          },
          tmX: {
            type: "float",
            description: "스터디가 이루어지는 장소의 위경도",
          },
          tmY: {
            type: "float",
            description: "스터디가 이루어지는 장소의 위경도",
          },
          deadline: {
            type: "date",
            description:
              "해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다",
          },
          status: {
            type: "integer",
            description:
              "해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...",
          },
        },
      },

      apiOpenStudy_ResponseForm_Success: {
        properties: {
          code: {
            type: "integer",
            description: "성공하면 코드 200이 리턴된다",
          },
          message: {
            type: "string",
            description: "성공하면 스터디 개설 성공 메세지가 전달된다 ",
          },
        },
      },

      apiOpenStudy_ResponseForm_Failed: {
        properties: {
          code: {
            type: "integer",
            description: "성공하면 코드 500이 리턴된다",
          },
          message: {
            type: "string",
            description:
              "실패 알수없는 서버내의 이유로 스터디 개설 실패 라는 메서지가 전달된다",
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
