import { ComposeSparklesIcon } from '@sanity/icons'
import { defineField, defineType } from "sanity"

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: ComposeSparklesIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the image for accessibility and SEO",
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: "items",
      title: "Questions & Answers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: Rule => Rule.required().min(5).max(200)
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              validation: Rule => Rule.required().min(10)
            }
          ],
          preview: {
            select: {
              title: 'question'
            }
          }
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ Section'
      }
    }
  }
})
