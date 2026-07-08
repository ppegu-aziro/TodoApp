import styled from "@emotion/styled";
import { Alarm, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { Checkbox, IconButton, TextField, css } from "@mui/material";
import { fadeIn, ring, scale } from "../../styles/keyframes.styled";
import { ColorPalette } from "../../theme/themeConfig";
import { getFontColor, isDark, systemInfo } from "../../utils";
import { reduceMotion } from "../../styles/reduceMotion.styled";

interface TaskComponentProps {
  backgroundColor: string;
  done: boolean;
  glow?: boolean;
  blur?: boolean;
  isDragging?: boolean;
}

export const TaskContainer = styled.div<TaskComponentProps>`
  display: flex;
  align-items: flex-start;
  padding: 18px 18px 18px 20px;
  border-radius: 24px;
  margin-top: 12px;
  gap: 14px;
  position: relative;
  overflow: hidden;
  transition: ${(
    { isDragging },
  ) => (isDragging ? "none" : "transform 0.2s, border-color 0.2s, opacity 0.4s, filter 0.3s, box-shadow 0.3s")};
  color: ${({ backgroundColor }) => getFontColor(backgroundColor)};
  background: ${({ backgroundColor, done }) =>
    `linear-gradient(135deg, ${backgroundColor}${done ? "66" : "f5"}, ${backgroundColor}${done ? "44" : "cc"})`};
  opacity: ${({ done }) => (done ? 0.86 : 1)};
  border: ${({ done }) => (done ? "1px solid #00ff1e8a" : "1px solid rgba(255, 255, 255, 0.22)")};
  box-shadow: ${(props) =>
    props.glow && !props.blur
      ? `0 16px 48px -28px ${props.backgroundColor}, 0 10px 24px -18px rgba(0, 0, 0, 0.45)`
      : "0 10px 26px -22px rgba(0, 0, 0, 0.45)"};
  filter: ${({ blur }) => (blur ? "blur(2px) opacity(75%)" : "none")};
  backdrop-filter: ${({ done }) => (done ? "blur(6px)" : "none")};

  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 6px;
    background: ${({ done }) => (done ? "#00ff1ee3" : "rgba(255, 255, 255, 0.55)")};
  }

  &:hover {
    transform: ${({ isDragging }) => (isDragging ? "none" : "translateY(-1px)")};
    border-color: ${({ done }) => (done ? "#00ff1ee3" : "rgba(255, 255, 255, 0.42)")};
    box-shadow: ${(props) =>
      props.glow && !props.blur
        ? `0 20px 54px -28px ${props.backgroundColor}, 0 14px 28px -18px rgba(0, 0, 0, 0.5)`
        : "0 14px 30px -22px rgba(0, 0, 0, 0.5)"};
  }

  *::selection {
    background-color: ${({ theme, backgroundColor }) =>
      theme.primary === backgroundColor ? "#ffffff" : theme.primary} !important;
    color: ${({ theme, backgroundColor }) =>
      theme.primary === backgroundColor ? "#000000" : getFontColor(theme.primary)} !important;
  }

  ${({ theme }) => reduceMotion(theme)}

  @media (max-width: 768px) {
    padding: 16px;
    margin-top: 10px;
    gap: 12px;
    border-radius: 20px;
  }

  @media print {
    break-inside: avoid;
    page-break-inside: avoid;
    background-color: #d62b2b;
    color: black;
    box-shadow: none;
    border: 2px solid black;
  }
`;

export const EmojiContainer = styled.span<{ clr: string }>`
  text-decoration: none;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ clr }) => (clr === ColorPalette.fontDark ? "#4b4b4b6e" : "#dddddd9d")};
  font-size: 32px;
  padding: 12px;
  width: 42px;
  height: 42px;
  border-radius: 18px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    padding: 10px;
    border-radius: 16px;
  }

  @media print {
    background-color: white;
    color: black;
    box-shadow: none;
    border: 2px solid black;
  }
`;

export const TaskCategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: left;
  align-items: center;
  margin-top: 6px;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 4px;
`;

export const TaskHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 4px;
  }
`;

export const TaskName = styled.h3<{ done: boolean }>`
  font-size: 20px;
  line-height: 1.25;
  margin: 0;
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  word-break: break-word;
  white-space: pre-line;
  opacity: ${({ done }) => (done ? 0.78 : 1)};
`;

export const TaskDate = styled.p`
  margin: 2px 0 0 auto;
  text-align: right;
  flex: 0 0 auto;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  opacity: 0.78;
  border-radius: 999px;
  padding: 3px 9px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: none !important;

  @media (max-width: 640px) {
    margin-left: 0;
    text-align: left;
  }
`;

export const TaskDescription = styled.div<{ done: boolean }>`
  margin: 2px 0 0;
  font-size: 16px;
  line-height: 1.45;
  opacity: ${({ done }) => (done ? 0.7 : 0.92)};
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  word-break: break-word;
`;

export const NoTasks = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100vw;
  opacity: 0.9;
  font-size: 18px;
  & span {
    font-weight: bold;
  }
`;

export const TaskNotFound = styled.div`
  text-align: center;
  font-size: 20px;
  opacity: 0.9;
  margin-top: 18px;
  animation: ${fadeIn} 0.5s ease-in;
  ${({ theme }) => reduceMotion(theme)}
`;

export const TasksContainer = styled.main`
  display: flex;
  justify-content: center;
  max-width: 760px;
  margin: 0 auto;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const TimeLeft = styled.span<{ done: boolean }>`
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  transition: 0.3s all;
  font-size: 14px;
  margin: 6px 0 0;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: none !important;

  @media (max-width: 768px) {
    font-size: 13px;
    flex-wrap: wrap;
  }

  // fix for browser translate
  & font {
    margin: 0 1px;
  }
`;

export const SharedByContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  font-size: 14px;
  opacity: 0.86;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DragHandle = styled.span`
  display: flex;
  align-items: center;
  padding: 6px;
  cursor: grab;
`;

export const Pinned = styled.div`
  display: inline-flex;
  width: fit-content;
  justify-content: left;
  align-items: center;
  opacity: 0.9;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
`;

export const TaskActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  background: ${({ theme }) => (isDark(theme.secondary) ? "#090b2287" : "#ffffff5c")};
  padding: 16px 20px;
  border-radius: 18px;
  position: sticky;
  top: ${systemInfo.os === "iOS" ? "52" : "60"}px;
  z-index: 1;
  backdrop-filter: blur(24px);

  animation: ${fadeIn} 0.3s ease-in;
  ${({ theme }) => reduceMotion(theme)}

  & h3 {
    margin: 0;
    display: flex;
    align-items: center;
  }
  & font {
    margin: 0 1px;
  }
`;

export const StyledRadio = styled(Checkbox)<{ clr: string }>`
  margin-left: -8px;
  margin-right: 4px;
  color: ${({ clr }) => clr} !important;
  animation: ${fadeIn} 0.3s ease-in;
  &.Mui-checked {
    color: ${({ clr }) => clr} !important;
  }
  ${({ theme }) => reduceMotion(theme)}
`;

const radioIconStyles = css`
  animation: ${scale} 0.2s ease-in;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const RadioChecked = styled(RadioButtonChecked)`
  ${radioIconStyles}
  ${({ theme }) => reduceMotion(theme)}
`;

export const RadioUnchecked = styled(RadioButtonUnchecked)`
  ${radioIconStyles}
  ${({ theme }) => reduceMotion(theme)}
`;

export const CategoriesListContainer = styled.div`
  position: sticky;
  background: transparent;
  backdrop-filter: blur(24px);
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 8px;
  overflow-x: auto;
  padding: 0 0 6px 0;
  margin: 8px 0;

  /* Custom Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => getFontColor(theme.secondary)}15;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => getFontColor(theme.secondary)}30;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => getFontColor(theme.secondary)}50;
  }

  ::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: ${({ theme }) => getFontColor(theme.secondary)}15;
  }
  @media print {
    display: none;
  }
`;

export const HighlightedText = styled.span`
  background-color: #6829ef;
  color: #fff;
  padding: 2px 0;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  margin: 0;
  font-weight: bold;
  border: 1px solid #ffffff5f;
  transition: 0.3s all;
`;

export const SearchInput = styled(TextField)`
  border-radius: 16px;
  transition: 0.3s all;
  width: 100%;

  & .MuiOutlinedInput-root {
    padding: 2px 16px;
    border-radius: 16px;
    transition: 0.3s all;
    background: ${({ theme }) => (isDark(theme.secondary) ? "#090b2258" : "#ffffff3e")};
    color: ${({ theme }) => getFontColor(theme.secondary)};

    & .MuiSvgIcon-root {
      color: ${({ theme }) => getFontColor(theme.secondary)};
    }

    &.Mui-focused {
      background: ${({ theme }) => (isDark(theme.secondary) ? "#090b228e" : "#ffffff8e")};
      box-shadow: ${({ theme }) =>
        isDark(theme.secondary) ? "0 0 0 4px #1a1e4a7f" : `0 0 0 4px ${theme.primary}64`};
    }
    &.Mui-focused .MuiSvgIcon-root {
      animation: ${scale} 0.3s ease-in-out;
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2px solid ${({ theme }) => theme.primary};
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ theme }) => (isDark(theme.secondary) ? "#44479cb7" : theme.primary)} !important;
    transition: 0.3s border;
  }

  @media print {
    display: none;
  }
`;

export const SearchClear = styled(IconButton)`
  animation: ${scale} 0.3s ease;
  transition: 0.3s all;
`;

const ringAnimation = "2s 0.5s ease-in-out infinite";

export const RingAlarm = styled(Alarm)<{ animate?: boolean }>`
  color: red;
  ${({ animate }) =>
    animate &&
    css`
      -webkit-animation: ${ring} ${ringAnimation};
      -moz-animation: ${ring} ${ringAnimation};
      animation: ${ring} ${ringAnimation};
    `}
  @media print {
    color: black !important;
    -webkit-animation: none;
    -moz-animation: none;
    animation: none;
  }
  ${({ theme }) => reduceMotion(theme)}
`;

export const TaskActionsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 40px;

  & .MuiIconButton-root {
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.12);
    transition: 0.2s background, 0.2s transform;
  }

  & .MuiIconButton-root:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateY(-1px);
  }

  @media print {
    display: none;
  }
`;