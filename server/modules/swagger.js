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
            419: {
              description:
                "쿠키내의 JWT 토큰이 accessToken , refreshToken 모두 유효기간이 다함 -> 즉 다시 로그인해야하니 로그인페이지로 보내야함",
              schema: {
                $ref: "#/definitions/apiAuthPayLoadResponseForm_VerifyFailed",
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
          },
        },
      },
      apiAuthJoinResponseForm: {
        properties: {
          success: {
            type: "integer",
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
          },
          message: {
            type: "string",
          },
          data: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              profile: {
                type: "object",
                properties: {
                  user_no: {
                    type: "integer",
                  },
                  id: {
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
        },
      },

      apiAuthPayLoadResponseForm_VerifyFailed: {
        properties: {
          code: {
            type: "integer",
          },
          message: {
            type: "string",
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
