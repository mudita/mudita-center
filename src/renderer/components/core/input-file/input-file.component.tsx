import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css, keyframes } from "styled-components"
import {
  borderColor,
  borderRadius,
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"

const Message = styled(Text)<{ dragging?: boolean }>`
  position: relative;
  z-index: ${({ dragging }) => (dragging ? -1 : 1)};
  color: ${textColor("placeholder")};
  letter-spacing: normal;

  strong {
    font-weight: inherit;
    color: ${textColor("supplementary")};
    cursor: pointer;
  }
`

const livingBorder = keyframes`
  0% {
    background-position: 0 0, 100% 100%, 0 100%, 100% 0;
  }
  100% {
    background-position: 100% 0, 0 100%, 0 -500%, 100% 600%;
  }
`

const Border = styled.div<{ draggingOver?: boolean }>`
  position: absolute;
  opacity: 0.2;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: ${borderRadius("medium")};
  background-image: linear-gradient(
      90deg,
      ${borderColor("dark")} 50%,
      transparent 50%
    ),
    linear-gradient(90deg, ${borderColor("dark")} 50%, transparent 50%),
    linear-gradient(0deg, ${borderColor("dark")} 50%, transparent 50%),
    linear-gradient(0deg, ${borderColor("dark")} 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 1rem 0.1rem, 1rem 0.1rem, 0.1rem 1rem, 0.1rem 1rem;
  background-position: 0 0, 100% 100%, 0 100%, 100% 0;
  animation: ${livingBorder} 10s infinite linear;
  animation-play-state: paused;
  transition: opacity ${transitionTime("quick")}
    ${transitionTimingFunction("smooth")};

  ${({ draggingOver }) =>
    draggingOver &&
    css`
      animation-play-state: running;
      opacity: 1;
    `};
`

const Label = styled.label<{ draggingOver?: boolean }>`
  padding: 1.2rem 1.6rem;
  margin-bottom: 1.2rem;
  position: relative;
  display: block;
  overflow: hidden;

  &:hover,
  &:focus-within {
    ${Border} {
      opacity: 1;
    }
  }

  input {
    opacity: 0;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`

const Remove = styled.span`
  cursor: pointer;
  opacity: 0.6;
  transition: opacity ${transitionTime("quick")}
    ${transitionTimingFunction("smooth")};

  &:hover {
    opacity: 1;
  }
`

const File = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  overflow: hidden;
  width: calc(50% - 2rem);
  margin-bottom: 0.8rem;
  user-select: none;

  p {
    user-select: none;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${textColor("placeholder")};
    margin: 0 2rem 0 0.5rem;
    white-space: nowrap;
  }
`

const FilesList = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const InputFileWrapper = styled.div``

export interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  onUpdate?: (files: File[]) => void
}

const InputFile: FunctionComponent<InputFileProps> = ({
  className,
  onChange = noop,
  multiple,
  onUpdate = noop,
  ...rest
}) => {
  const [draggingState, setDraggingState] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const enableDraggingState = () => setDraggingState(true)

  const disableDraggingState = () => setDraggingState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
    if (event.target.files) {
      if (multiple) {
        const filterDuplicates = (newFile: File) => {
          return !files.some(
            (file: File) =>
              file.name === newFile.name &&
              file.size === newFile.size &&
              file.lastModified === newFile.lastModified
          )
        }
        setFiles([
          ...files,
          ...Array.from(event.target.files).filter(filterDuplicates),
        ])
      } else {
        setFiles(Array.from(event.target.files))
      }
    }
  }

  useEffect(() => {
    onUpdate(files)
  }, [files])

  return (
    <InputFileWrapper className={className}>
      <Label
        onDragOver={enableDraggingState}
        onDragLeave={disableDraggingState}
        onDragEnd={disableDraggingState}
        onDrop={disableDraggingState}
        draggingOver={draggingState}
      >
        <Border draggingOver={draggingState} />
        <input
          {...rest}
          multiple={multiple}
          type="file"
          onChange={handleChange}
        />
        <Message
          dragging={draggingState}
          displayStyle={TextDisplayStyle.MediumLightText}
          message={{
            id: "form.field.fileUpload.description",
            values: textFormatters,
          }}
        />
      </Label>
      <FilesList>
        {files.map((file, index) => {
          const removeAttachment = () => {
            const tempFiles = [...files]
            tempFiles.splice(index, 1)
            setFiles(tempFiles)
          }
          return (
            <File key={index}>
              <Icon type={Type.Attachment} height={1.6} />
              <Text displayStyle={TextDisplayStyle.MediumFadedText}>
                {file.name}
              </Text>
              <Remove onClick={removeAttachment} role="button">
                <Icon type={Type.Remove} width={1.6} />
              </Remove>
            </File>
          )
        })}
      </FilesList>
    </InputFileWrapper>
  )
}

export default InputFile
