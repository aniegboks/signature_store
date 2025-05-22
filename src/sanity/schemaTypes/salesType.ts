import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Sales Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount",
      type: "number",
      description: "Amount off in percentage or fixed value",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
      description: "Code customers use to activate the discount",
      validation: (Rule) => Rule.required().min(3).max(20),
    }),
    defineField({
      name: "validform",
      title: "Valid Form",
      type: "datetime",
    }),
    defineField({
      name: "validDuration",
      title: "Valid Duration",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Active Status",
      type: "boolean",
      description: "Activate/ deactivate sales",
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare({ title, discountAmount, couponCode, isActive }) {
      const cleanTitle = title || "Untitled Sale";
      const code = couponCode ? ` (${couponCode})` : "";
      const status = isActive === false ? " (Inactive)" : "";
      const discountText = discountAmount !== undefined ? `${discountAmount} off` : "No discount";

      return {
        title: `${cleanTitle}${code}`,
        subtitle: `${discountText}${status}`,
      };
    },
  },
});
