export const tabs = {
  style: "Style",
  color: "Colors",
  spacing: "Spacing",
  typography: "Typography",
  typographyBasic: "Basic",
  typographyAdvanced: "Advanced",
  components: "Components",
  atoms: "Atoms",
  molecules: "Molecules",
  organisms: "Organisms",
  templates: "Templates",
  pages: "Pages",
} as const

export const paths = {
  color: `${tabs.style}/${tabs.color}`,
  typography: `${tabs.style}/${tabs.typography}`,
  spacing: `${tabs.style}/${tabs.spacing}`,
  atoms: `${tabs.components}/${tabs.atoms}`,
  molecules: `${tabs.components}/${tabs.molecules}`,
  organisms: `${tabs.components}/${tabs.organisms}`,
  templates: tabs.templates,
  pages: tabs.pages,
} as const
