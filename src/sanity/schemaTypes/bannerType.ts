import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const bannerType = defineType({
    name: "banner",
    title: "Banner",
    type: "document",
    icon: DashboardIcon,
    fields: [
        defineField({
            name: "name",
            title: "Banner Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "description",
            title: "Banner Description",
            type: "text"
        }),
        defineField({
            name: "images",
            title: "Baner Image",
            type: "image",

            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "cardImages",
            title: "Card Image",
            type: "image",

            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            subtitle: "description",
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.subtitle}`,
                media: select.media,
            };
        },
    },
});
