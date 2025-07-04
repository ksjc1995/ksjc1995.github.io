import { useState, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { cloneDeep } from "lodash";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiCss3,
  SiBabel,
  SiNodedotjs,
  SiGit,
  SiVisualstudiocode,
  SiReact,
  SiVuedotjs,
  SiPython,
} from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";

import { Timeline, Card, Badge } from "antd";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const themeColor = "#E1F5FE";
const dark500 = "#546E7A";
const themeColor300 = "#4FC3F7";
const dark = "#37474F";

const THEMES = {
  blue: {
    themeColor: "#E1F5FE",
    themeColor300: "#4FC3F7",
    dark: "#37474F",
    dark500: "#546E7A",
  },

  red: {
    themeColor: "#FFEBEE",
    themeColor300: "#E57373",
    dark: "#37474F",
    dark500: "#546E7A",
  },

  green: {
    themeColor: "#E8F5E9",
    themeColor300: "#81C784",
    dark: "#37474F",
    dark500: "#546E7A",
  },
  orange: {
    themeColor: "#FFF3E0",
    themeColor300: "#FFB74D",
    dark: "#37474F",
    dark500: "#546E7A",
  },
};

const Layout = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100vh;
`;

const Box = styled.div`
  background-color: ${(props) => props.bg};
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(1, 1fr);
  grid-template-columns: ${(props) =>
    props.cratios && props.cratios.length > 0 && props.cratios.join(" ")};
  grid-template-rows: ${(props) =>
    props.rratios && props.rratios.length > 0 && props.rratios.join(" ")};
  cursor: ${(props) => props.cursor};
  ${(props) =>
    props.id && props.id !== "preview"
      ? `
    border-left: 1px solid #cfd8dc;

    &:hover{
      ${Highlight} {
        background-color: ${(props) => props.theme.themeColor};
      }
    }
  `
      : ""}
  overflow-y: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const Text = styled.span`
  font-size: ${(props) => props.fontsize}px;
  writing-mode: ${(props) => props.writingmode};
  font-weight: 500;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Highlight = styled.span`
  padding: 16px 0px;
  ${(props) => props.color && `background-color: ${props.color}`}
`;

const Image = styled.div`
  background-image: url("/profile.png");
  background-size: 300%;
  background-repeat: no-repeat;
  background-position: -130px -240px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const ImageWrapper = styled.div`
  background: ${(props) => `repeating-linear-gradient(
    90deg,
    ${props.theme.themeColor},
    ${props.theme.themeColor} 1px,
    ${props.theme.dark500} 2px,
    ${props.theme.dark500} 2px
  )`};
  margin-bottom: 18px;
  border-radius: 50%;
  transition: transform 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Headline = styled.h2`
  font-size: 32px;
  font-weight: 400;
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
`;

const Name = styled.span`
  font-weight: 700;
`;

const Footer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
  padding: 16px;
  font-size: 24px;

  a {
    text-decoration: inherit; /* no underline */
    color: white;

    &:hover {
      color: ${(props) => props.theme.dark};
    }
  }
`;

const ResumeLink = styled(Text)`
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.dark};
  }
`;

const Underline = styled.span`
  border-bottom: 2px solid ${dark500};
`;

const TimelineWrapper = styled.div`
  padding: 16px;
  display: grid;
  align-items: center;
`;

const TimelineLabel = styled(Text)`
  font-weight: bold;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    color: ${(props) => props.theme.themeColor300};
  }
`;

const ProjectsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  padding-top: 16px;
  justify-content: center;
  overflow-y: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  a {
    margin: 16px auto;
    width: 100%;
  }
`;

const IconsWrapper = styled(Center)`
  font-size: 24px;
  color: ${(props) => props.theme.dark};

  > * {
    margin-right: 16px;
  }
`;

const Themes = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ColorCircle = styled.div`
  margin-right: 8px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${(props) => THEMES[props.color].themeColor300};

  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const LINKS = [
  { name: "Journey", size: "1fr", id: "journey" },
  { name: "Skills", size: "1fr", id: "skills" },
  { name: "Projects", size: "1fr", id: "projects" },
  { name: "Contact", size: "1fr", id: "contact" },
];

function App() {
  const gridRef = useRef(null);
  const [theme, setTheme] = useState(THEMES.blue);
  const [links, setLinks] = useState(LINKS);
  const [activeLink, setActiveLink] = useState("journey");

  const { themeColor, themeColor300, dark, dark500 } = theme;

  useEffect(() => {
    handleLinkClick(null, 0, "Journey", "journey");
  }, []);

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  const handleLinkClick = (event, linkIndex, name, id) => {
    if (name !== "") {
      const newLinks = cloneDeep(LINKS);
      const previewArea = { name: "", size: "8fr", id: "preview" };

      const newPreviewIndex =
        linkIndex > links.findIndex((link) => link.name === "") &&
        linkIndex !== 0 &&
        links.findIndex((link) => link.name === "") > 0
          ? linkIndex
          : linkIndex + 1;
      newLinks.splice(newPreviewIndex, 0, previewArea);
      setLinks(newLinks);
      setActiveLink(id);
    }
  };

  const renderPreviewContent = () => {
    if (activeLink == "journey") {
      return (
        <Box key="preview">
          <TimelineWrapper>
            {" "}
            <Timeline mode="alternate">
              <Timeline.Item color={themeColor300}>
                <strong>B.Tech. (CSE)</strong> <br />
                Jaypee University of Information Tech.
              </Timeline.Item>
              <Timeline.Item color={themeColor300}>
                <strong>Software Engineer</strong> <br />
                Wednesday Solutions
              </Timeline.Item>

              <Timeline.Item color={themeColor300}>
                <strong>Associate Technology L2</strong> <br />
                Publicis Sapient
              </Timeline.Item>
              <Timeline.Item color={themeColor300}>
                <strong>Engineering Manager - Frontend</strong> <br />
                Harmoney
              </Timeline.Item>
            </Timeline>
          </TimelineWrapper>
        </Box>
      );
    } else if (activeLink === "contact") {
      return renderContacts();
    } else if (activeLink === "projects") {
      return renderProjects();
    } else if (activeLink === "skills") {
      return renderSkillIcons();
    } else {
      return (
        <Box key="preview">
          <Center>{activeLink}</Center>
        </Box>
      );
    }
  };

  const renderContacts = () => {
    return (
      <Box key="preview">
        <Center>
          <EmailWrapper>
            <Text fontsize={16}>
              <FaEnvelope />
            </Text>
            <Text fontsize={18}>
              <strong>Email: </strong>
              <a href="mailto: ks.jc1995@gmail.com">ks.jc1995@gmail.com</a>
            </Text>
          </EmailWrapper>
        </Center>
      </Box>
    );
  };

  const renderProjects = () => {
    return (
      <ProjectsWrapper crations={["1fr"]}>
        <a href="https://color-guessing-game-react.vercel.app/" target="_blank">
          <Badge.Ribbon
            color={themeColor300}
            text={
              <Center>
                <SiReact />
                <SiJavascript />
              </Center>
            }
          >
            <Card hoverable style={{ border: `1px solid ${themeColor300}` }}>
              <Card.Meta
                title={
                  <strong>
                    Color Guessing Game <BiLinkExternal />
                  </strong>
                }
                description="RGB color guessing game build using React with multi levels"
              />
            </Card>
          </Badge.Ribbon>
        </a>
        <a href="https://curriculum-creator.vercel.app/" target="_blank">
          <Badge.Ribbon
            color={themeColor300}
            text={
              <Center>
                <SiReact />
                <SiTypescript />
              </Center>
            }
          >
            <Card hoverable style={{ border: `1px solid ${themeColor300}` }}>
              <Card.Meta
                title={
                  <strong>
                    Book Index Creator <BiLinkExternal />
                  </strong>
                }
                description="Book Index creator with drag and drop, multi level indent, deletion, save as JSON features"
              />
            </Card>
          </Badge.Ribbon>
        </a>
        <a
          href="https://github.com/ksjc1995/puzzle-game-webapp"
          target="_blank"
        >
          <Badge.Ribbon
            color={themeColor300}
            text={
              <Center>
                <SiVuedotjs />
                <SiJavascript />
              </Center>
            }
          >
            <Card hoverable style={{ border: `1px solid ${themeColor300}` }}>
              <Card.Meta
                title={
                  <strong>
                    Word Puzzle game <BiLinkExternal />
                  </strong>
                }
                description="Word puzzle game with multiple levels built using vuejs. Users need to answer a question using a matrix of jumbled characters."
              />
            </Card>
          </Badge.Ribbon>
        </a>
        <a href="https://github.com/ksjc1995/pyKed" target="_blank">
          <Badge.Ribbon
            color={themeColor300}
            text={
              <Center>
                <SiPython />
              </Center>
            }
          >
            <Card hoverable style={{ border: `1px solid ${themeColor300}` }}>
              <Card.Meta
                title={
                  <strong>
                    PyKed <BiLinkExternal />
                  </strong>
                }
                description="A simple Image Editor built with python, tkinter and PIL. "
              />
            </Card>
          </Badge.Ribbon>
        </a>
      </ProjectsWrapper>
    );
  };

  const renderLinks = () => {
    return (
      <Box
        ref={gridRef}
        rratios={["1fr"]}
        cratios={links.map((link) => link.size)}
      >
        {links.map((link, index) => {
          if (link.id === "preview") {
            return renderPreviewContent();
          }
          return (
            <Box
              key={link.id}
              id={link.id}
              onClick={(event) =>
                handleLinkClick(event, index, link.name, link.id)
              }
              cursor={link.name !== "" ? "pointer" : "default"}
            >
              <Text fontsize={22} writingmode="vertical-rl">
                <Center>
                  <Highlight
                    id="hightlight"
                    color={activeLink === link.id ? themeColor : "white"}
                  >
                    {link.name}
                  </Highlight>
                </Center>
              </Text>
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderSkillIcons = () => {
    return (
      <Box key="preview">
        <IconsWrapper>
          <FaReact /> <SiTypescript /> <SiBabel /> <SiCss3 /> <SiNodedotjs />
          <SiJavascript />
          <SiGit />
          <SiVisualstudiocode />
          <FaVuejs />
        </IconsWrapper>
      </Box>
    );
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout>
          <Box rratios={["4fr", "1fr"]} cratios={[]}>
            {renderLinks()}
            <Box bg={dark500}>
              <Footer>
                <ResumeLink fontsize={16}>
                  {" "}
                  <a
                    download
                    href="https://github.com/ksjc1995/ksjc1995.github.io/raw/master/kartik-resume.pdf"
                  >
                    Resume
                  </a>
                </ResumeLink>
                <div>
                  <a
                    style={{ marginRight: "8px" }}
                    href="https://github.com/ksjc1995/"
                    target={"_blank"}
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kartik-sharma-742b4867/"
                    target={"_blank"}
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </Footer>
            </Box>
          </Box>
          <Box bg={themeColor}>
            <Wrapper>
              <ImageWrapper>
                <Image />
              </ImageWrapper>
              <Headline>
                Hi there! I am{" "}
                <Name>
                  <Underline>KARTIK SHARMA</Underline>
                </Name>
              </Headline>
              <Description>
                I am a full stack developer with 5+ years of extensive
                experience building scalable, responsive & pixel perfect web
                applications. Currently working as a Engineering Manager -
                Frontend at Harmoney.
              </Description>

              <Themes>
                <ColorCircle
                  color="blue"
                  onClick={() => handleThemeChange(THEMES.blue)}
                />
                <ColorCircle
                  color="red"
                  onClick={() => handleThemeChange(THEMES.red)}
                />
                <ColorCircle
                  color="green"
                  onClick={() => handleThemeChange(THEMES.green)}
                />
                <ColorCircle
                  color="orange"
                  onClick={() => handleThemeChange(THEMES.orange)}
                />
              </Themes>
            </Wrapper>
          </Box>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
