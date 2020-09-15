import NickLewis from "Renderer/images/nick-lewis@2x.png"
import MuditaBell from "Renderer/images/bell@2x.png"
import MuditaPure from "Renderer/images/pure@2x.png"
import { Props as ProductCard } from "Renderer/components/rest/news/product-card/product-card.component"

const productCards: ProductCard[] = [
  {
    url: "https://www.mudita.com/",
    imageSource: NickLewis,
    title: "Nick Lewis Album",
    subtitle: "Halfway to the begin",
    label: "Released",
    featuresElements: [
      "Acoustic music",
      "Uplifting lyrics",
      "We've made it our manifesto",
    ],
    buttonLabel: "Learn more",
    connected: false,
  },
  {
    url: "https://www.mudita.com/",
    imageSource: MuditaBell,
    title: "Mudita Bell",
    subtitle: "Invite peace to your bedroom",
    label: "In development",
    featuresElements: [
      "No smartphone in your bedroom",
      "Healthy bedtime habits",
      "E Ink screen",
      "Air quality sensor",
      "Pleasant tones by Nick Lewis",
      "Meditation timer",
    ],
    buttonLabel: "Learn more",
    connected: false,
  },
  {
    url: "https://www.mudita.com/products/pure/#preorder",
    imageSource: MuditaPure,
    title: "Mudita Pure",
    subtitle: "A modern feature phone",
    label: "In development",
    featuresElements: [
      'Latest hi-res E Ink screen (2,84" 600x480)',
      "Global coverage",
      "Proprietary operating system",
      "Ultralow radiation (SAR)",
      "Meditation timer",
    ],
    buttonLabel: "Pre-order",
    connected: true,
  },
]

export default {
  state: {
    productCards,
  },
}
