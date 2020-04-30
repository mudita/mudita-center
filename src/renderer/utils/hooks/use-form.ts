import { ChangeEvent, useState } from "react"
import { set } from "lodash"

const useForm = <T extends object>(initialFields: T) => {
  const [fields, setFields] = useState<T>(initialFields)

  const updateField = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name, checked, type } = event.target as HTMLInputElement
    const newValue = type === "checkbox" ? Boolean(checked) : value

    setFields(set({ ...fields }, name, newValue))
  }

  return {
    updateField,
    fields,
  }
}

export default useForm
