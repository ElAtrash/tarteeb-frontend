import type { ThemeConfig } from "antd";

const themeConfig: ThemeConfig = {
  hashed: false,
  components: {
    Layout: {
      headerBg: "rgb(255,255,255)",
      footerBg: "rgb(255,255,255)",
      headerColor: "rgb(255,255,255)",
    },
    Button: {
      colorLink: "rgb(64,170,163)",
      colorPrimaryHover: "rgb(77,178,171)",
    },
    Table: {
      headerBg: "rgb(250,250,250)",
      headerSortHoverBg: "#f0f0f0",
      bodySortBg: "rgb(250,250,250)",
      fixedHeaderSortActiveBg: "#f0f0f0",
      headerSortActiveBg: "#f0f0f0",
      rowHoverBg: "rgb(250,250,250)",
    },
    Menu: {
      subMenuItemBg: "rgb(255,255,255)",
      itemHoverBg: "rgb(239,247,246)",
      itemSelectedColor: "rgb(0,0,0)",
      itemColor: "rgb(0,0,0)",
    },
  },
  token: {
    colorPrimary: "rgb(64,170,163)",
    colorLinkActive: "rgb(64,170,163)",
    colorLinkHover: "rgb(64,170,163)",
    colorBgLayout: "rgb(255,255,255)",
    colorBgContainer: "rgb(255,255,255)",
  },
};

export default themeConfig;
