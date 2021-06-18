/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
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
import { intl, textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { InputError } from "Renderer/components/core/input-text/input-text.elements"
import { convertBytes } from "Renderer/utils/convert-bytes"
import { defineMessages } from "react-intl"
import FileList from "Renderer/components/core/file-list/file-list.component"

const Message = styled(Text)<{ dragging?: boolean }>`
  position: relative;
  z-index: ${({ dragging }) => (dragging ? -1 : 1)};
  color: ${textColor("secondary")};
  letter-spacing: normal;

  strong {
    font-weight: inherit;
    color: ${textColor("action")};
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
      ${borderColor("primary")} 50%,
      transparent 50%
    ),
    linear-gradient(90deg, ${borderColor("primary")} 50%, transparent 50%),
    linear-gradient(0deg, ${borderColor("primary")} 50%, transparent 50%),
    linear-gradient(0deg, ${borderColor("primary")} 50%, transparent 50%);
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

const InputFileWrapper = styled.div`
  ${InputError} {
    position: relative;
    padding-left: 0;
  }
`

const Label = styled.label`
  padding: 1.2rem 1.6rem;
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

const messages = defineMessages({
  single: {
    id: "component.formFileUploadDescription",
  },
  multiple: {
    id: "component.formMultipleFileUpload",
  },
  sizeError: {
    id: "component.formErrorNameIsTooBig",
  },
  typeError: {
    id: "component.formErrorTypeNotAllowed",
  },
  countError: {
    id: "component.formErrorTooManyFiles",
  },
})

export enum FileInputErrorReason {
  Type,
  Size,
  Count,
}

export interface FileInputError {
  reason: FileInputErrorReason
  file?: File
}

export interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  onUpdate?: (files: File[]) => void
  maxFileSize?: number
  handleError?: (error: FileInputError) => void
  maxAllowedFiles?: number
  errorTimeout?: number
}

const InputFile: FunctionComponent<InputFileProps> = ({
  className,
  onChange = noop,
  multiple,
  onUpdate = noop,
  maxFileSize = Infinity,
  handleError = noop,
  accept = "",
  maxAllowedFiles = Infinity,
  errorTimeout = 5000,
  ...rest
}) => {
  const [draggingState, setDraggingState] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [errorMessage, setErrorMessage] = useState<string>("")
  const errorMessageTimeout = useRef<NodeJS.Timeout>()
  const inputRef = useRef<HTMLInputElement>(null)

  const removeTimeoutHandler = () => {
    if (errorMessageTimeout.current) {
      clearTimeout(errorMessageTimeout.current)
    }
  }

  const enableDraggingState = () => {
    resetError()
    setDraggingState(true)
  }

  const disableDraggingState = () => setDraggingState(false)

  const resetError = () => setErrorMessage("")

  const checkExtension = (file: File) => {
    if (!accept) {
      return !accept
    }

    const acceptedTypes = accept
      .split(",")
      .map((acceptedType) => acceptedType.trim())

    const fileTypeAllowed = acceptedTypes.some((acceptedType) => {
      if (acceptedType.includes("/")) {
        // MIME type
        return file.type.startsWith(acceptedType.replace("/*", "/"))
      } else {
        // Extension
        return acceptedType.slice(1) === file.name.split(".").pop()
      }
    })

    if (!fileTypeAllowed && !errorMessage) {
      const extensions = acceptedTypes
        .map((acceptedType) => {
          return acceptedType.replace("/*", "")
        })
        .join(", ")

      setError(
        {
          reason: FileInputErrorReason.Type,
          file,
        },
        intl.formatMessage(messages.typeError, {
          name: file.name,
          extensions,
          ...textFormatters,
        }) as string
      )
    }

    return fileTypeAllowed
  }

  const checkSize = (file: File) => {
    const sizeValid = file.size <= maxFileSize
    if (!sizeValid && !errorMessage) {
      disableDraggingState()
      setError(
        {
          reason: FileInputErrorReason.Size,
          file,
        },
        intl.formatMessage(messages.sizeError, {
          name: file.name,
          size: convertBytes(maxFileSize, {
            fixedFractionDigits: false,
            precision: 2,
          }),
          ...textFormatters,
        }) as string
      )
    }
    return sizeValid
  }

  const checkFile = (file: File) => checkExtension(file) && checkSize(file)

  const checkForDuplicate = (newFile: File) => {
    return !files.some(
      (file: File) =>
        file.name === newFile.name &&
        file.size === newFile.size &&
        file.lastModified === newFile.lastModified
    )
  }

  const setError = (error: FileInputError, message: string) => {
    removeTimeoutHandler()
    errorMessageTimeout.current = setTimeout(() => {
      resetError()
      removeTimeoutHandler()
    }, errorTimeout)

    setErrorMessage(message)
    handleError(error)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
    if (event.target.files) {
      let newFiles: File[]

      if (multiple) {
        newFiles = [
          ...files,
          ...Array.from(event.target.files)
            .filter(checkFile)
            .filter(checkForDuplicate),
        ]
      } else {
        newFiles = Array.from(event.target.files).filter(checkFile)
      }

      if (multiple && newFiles.length > maxAllowedFiles) {
        setError(
          {
            reason: FileInputErrorReason.Count,
          },
          intl.formatMessage(messages.countError, {
            limit: maxAllowedFiles,
          })
        )

        newFiles = newFiles.splice(0, maxAllowedFiles)
      }

      setFiles(newFiles)
    }
  }

  useEffect(() => {
    onUpdate(files)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }, [files])

  useEffect(() => () => removeTimeoutHandler(), [])

  const removeAttachment = (index: number) => {
    const tempFiles = [...files]
    tempFiles.splice(index, 1)
    setFiles(tempFiles)
    resetError()
  }

  return (
    <InputFileWrapper className={className}>
      <Label
        onDragEnter={enableDraggingState}
        onDragLeave={disableDraggingState}
        onDragEnd={disableDraggingState}
        onDrop={disableDraggingState}
      >
        <Border draggingOver={draggingState} />
        <input
          {...rest}
          multiple={multiple}
          accept={accept}
          type="file"
          onChange={handleChange}
          onClick={resetError}
          ref={inputRef}
        />
        <Message
          dragging={draggingState}
          displayStyle={TextDisplayStyle.MediumLightText}
          message={{
            ...(multiple ? messages.multiple : messages.single),
            values: textFormatters,
          }}
        />
      </Label>
      <InputError visible={Boolean(errorMessage)}>{errorMessage}</InputError>
      <FileList files={files} onRemoveClick={removeAttachment} />
    </InputFileWrapper>
  )
}

export default InputFile
