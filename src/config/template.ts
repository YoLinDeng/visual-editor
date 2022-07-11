export const config: any =  {
  text: [
    {
      config: {
        name: 'content-box',
        slot: [
          {
            name: 'content-input',
            style: {
              backgroundImage: require('@/assets/title1-left-icon.png'),
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              borderWidth: 0,
              fontSize: '14px',
              height: '13px',
              lineHeight: '32px',
              width: '18px'
            },
            value: ''
          },
          {
            name: 'content-input',
            style: {
              height: '32px',
              paddingLeft: '5px',
              paddingRight: '5px'
            },
            value: "<div style=\"line-height: 2;\"><span style=\"font-size: 16px; color: #fce7b6;\"><strong>活动规则</strong></span></div>"
          },
          {
            name: 'content-input',
            style: {
              backgroundImage: require('@/assets/title1-right-icon.png'),
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              borderWidth: 0,
              fontSize: '14px',
              height: '13px',
              lineHeight: '32px',
              marginRight: '5px',
              width: '18px'
            },
            value: ''
          }
        ],
        style: {
          alignItems: 'center',
          backgroundColor: 'rgba(246, 96, 75, 1)',
          display: 'flex',
          height: '40px',
          justifyContent: 'center',
          paddingLeft: '1px'
        },
        value: ''
      },
      name: '带点的标题',
      preview: require('@/assets/title1.png')
    }
  ],
  img: [
    {
      config: {
        value: require('@/assets/gift.png'),
        name: 'content-asset',
        style: {
          width: '100px',
          height: '100px',
          display: 'inline-block'
        }
      },
      preview: require('@/assets/gift.png'),
      name: '礼包'
    }
  ],
  btn: [
    {
      config: {
        name: 'content-input',
        value: "<div style=\"text-align: center;\"><span style=\"font-size: 20px; color: #ffffff;\">限时领取</span></div>",
        style: {
          alignItems: "center",
          backgroundColor: "rgba(255, 0, 0, 1)",
          display: "flex",
          height: "60px",
          justifyContent: "center",
          paddingBottom: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
          paddingTop: "0px",
        }
      },
      name: "基础按钮",
      preview: require('@/assets/button1.png')
    },
    {
      config: {
        name: "content-box",
        slot: [
          {
            name: "content-input",
            style: {
              alignItems: "center",
              backgroundColor: "rgba(228, 196, 110, 1)",
              backgroundImage: "linear-gradient(0deg,rgba(218,184,102,1),rgba(240,233,170,1))",
              borderRadius: "22px",
              display: "flex",
              height: "44px",
              justifyContent: "center",
              marginBottom: "0",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "0",
              width: "90%",
            },
            value: "<div style=\"text-align: center;\"><span style=\"color: #202022; font-size: 18px;\"><strong>立即购买</strong></span></div>"
          }
        ],
        style: {
          backgroundColor: "rgba(32, 32, 34, 1)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          padding: "10px 0"
        },
        value: ""
      },
      name: "金色按钮",
      preview: require("@/assets/button2.png")
    }
  ],
  form: [
    {
      config: {
        fields: [
          {
            label: '姓名',
            prop: 'name',
            other: {
              placeholder: "",
              sex: {
                text: '男/女',
                visible: 1
              }
            }
          },
          {
            label: '手机号',
            prop: 'mobile',
            other: {
              hideMobileCode: 0,
              placeholder: ""
            }
          }
        ],
        name: 'v-form',
        submitBtnOpts: {
          text: '提交',
          style: ''
        },
        slot: [],
        bottomSlot: [],
        style: {},
      },
      name: '表单',
      preview: '',
    }
  ]
}