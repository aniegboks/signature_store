import { BillIcon } from '@sanity/icons'
import { defineField, defineType } from "sanity"

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: BillIcon,
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the image for accessibility",
          validation: Rule => Rule.required()
        }
      ]
    }),

    defineField({
      name: "socialImage",
      title: "Social image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the image for accessibility",
          validation: Rule => Rule.required()
        }
      ]
    }),

    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required().min(2).max(100)
    }),
   
    defineField({
      name: "socialHandle",
      title: "Social Handle",
      type: "string"
    }),

    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "text",
      validation: Rule => Rule.required().min(10)
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "testimonial",
      media: "image"
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle.length > 50 ? subtitle.slice(0, 50) + "..." : subtitle,
        media
      }
    }
  }
})
